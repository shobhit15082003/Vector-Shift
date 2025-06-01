import { useState, useEffect, useRef, useCallback } from "react";
import { Position } from "reactflow";
import { PrimaryNode } from "../ParentNode/PrimaryNode";

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
const MIN_WIDTH = 160;
const MAX_WIDTH = 400;
const MIN_HEIGHT = 100;
const MOBILE_ADJUSTMENT = 0.8;

export const TextNode = ({ id, data }) => {
  const [state, setState] = useState({
    text: data?.text || "{{input}}",
  });

  const [variables, setVariables] = useState([]);
  const [invalidVariables, setInvalidVariables] = useState([]);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 200, height: 120 });

  const updateVariables = useCallback((text) => {
    const foundVars = new Set();
    const invalidVars = new Set();
    let match;
    
    while ((match = VARIABLE_REGEX.exec(text)) !== null) {
      try {
        new Function(match[1], 'var ' + match[1]);
        foundVars.add(match[1]);
      } catch (e) {
        invalidVars.add(match[1]);
      }
    }
    
    setVariables(Array.from(foundVars));
    setInvalidVariables(Array.from(invalidVars));
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setState({ text: newText });
    updateVariables(newText);
  };

  const updateSize = useCallback(() => {
    if (textareaRef.current && containerRef.current) {
      const isMobile = window.innerWidth < 640;
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scale = isMobile ? MOBILE_ADJUSTMENT : 1;
      const padding = isMobile ? 20 : 40;
      const contentWidth = Math.min(
        Math.max(textarea.scrollWidth * scale, MIN_WIDTH),
        MAX_WIDTH
      );
      const newHeight = Math.max(
        textarea.scrollHeight * scale, 
        MIN_HEIGHT
      );
      setSize({ 
        width: contentWidth + padding,
        height: newHeight + padding
      });
    }
  }, []);

  useEffect(() => {
    updateVariables(state.text);
  }, [state.text, updateVariables]);

  useEffect(() => {
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [updateSize]);

  const handles = [
    ...variables.map((v, idx) => ({
      type: "target",
      position: Position.Left,
      id: v,
      className: "!bg-purple-500 !dark:bg-purple-400 w-3 h-3 border-2 border-white dark:border-gray-800",
      style: {
        top: `${20 + idx * 24}px`,
        zIndex: 10
      },
      data: { label: v },
    })),
    {
      type: "source",
      position: Position.Right,
      id: "output",
      className: "!bg-blue-500 !dark:bg-blue-400 w-3 h-3 border-2 border-white dark:border-gray-800",
    },
  ];

  return (
    <PrimaryNode
      id={id}
      title="Text Template"
      state={state}
      setState={setState}
      fields={[
        {
          label: "",
          key: "text",
          type: "textarea",
          inputProps: {
            ref: textareaRef,
            className: `
              w-full p-2 border border-gray-300 dark:border-gray-600 rounded
              bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden
              min-h-[60px] max-sm:min-h-[40px] max-sm:p-1 max-sm:text-sm
              ${invalidVariables.length > 0 ? 'border-red-500 dark:border-red-400' : ''}
            `,
            placeholder: "Enter text with {{variables}}...",
            value: state.text,
            onChange: handleTextChange,
            rows: 3,
          },
        },
      ]}
      handles={handles}
      containerStyle={{
        width: size.width,
        minHeight: size.height,
        transition: "all 0.2s ease-out",
      }}
      containerRef={containerRef}
    >
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-sm:text-xxs space-y-1">
        {variables.length > 0 && (
          <div>Variables: {variables.join(", ")}</div>
        )}
        {invalidVariables.length > 0 && (
          <div className="text-red-500 dark:text-red-400">
            Invalid: {invalidVariables.join(", ")}
          </div>
        )}
      </div>
    </PrimaryNode>
  );
};