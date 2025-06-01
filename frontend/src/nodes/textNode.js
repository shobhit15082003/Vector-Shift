import { useState, useEffect, useRef } from "react";
import { Position } from "reactflow";
import { PrimaryNode } from "../ParentNode/PrimaryNode";

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [state, setState] = useState({
    text: data?.text || "{{input}}",
  });

  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 200, height: 120 });

  useEffect(() => {
    const foundVars = new Set();
    let match;
    while ((match = VARIABLE_REGEX.exec(state.text)) !== null) {
      foundVars.add(match[1]);
    }
    setVariables(Array.from(foundVars));
  }, [state.text]);

  useEffect(() => {
    if (textareaRef.current && containerRef.current) {
      const textarea = textareaRef.current;

      textarea.style.height = "auto";

      const minWidth = window.innerWidth < 640 ? 160 : 200;
      const maxWidth = window.innerWidth < 640 ? 300 : 400;
      const minHeight = window.innerWidth < 640 ? 100 : 120;

      const contentWidth = Math.max(
        textarea.scrollWidth,
        minWidth - (window.innerWidth < 640 ? 20 : 40)
      );

      const newWidth = Math.min(
        maxWidth,
        contentWidth + (window.innerWidth < 640 ? 20 : 40)
      );
      const newHeight = Math.max(
        minHeight,
        textarea.scrollHeight + (window.innerWidth < 640 ? 40 : 80)
      );

      textarea.style.height = `${textarea.scrollHeight}px`;
      setSize({ width: newWidth, height: newHeight });
    }
  }, [state.text]);

  const handles = [
    ...variables.map((v, idx) => ({
      type: "target",
      position: Position.Left,
      id: v,
      className: "bg-purple-500 dark:bg-purple-400 max-sm:w-2 max-sm:h-2",
      style: {
        top: `${
          (window.innerWidth < 640 ? 15 : 20) +
          idx * (window.innerWidth < 640 ? 18 : 24)
        }px`,
      },
      data: { label: v },
    })),
    {
      type: "source",
      position: Position.Right,
      id: "output",
      className: "bg-blue-500 dark:bg-blue-400 max-sm:w-2 max-sm:h-2",
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
            `,
            placeholder: "Enter text with {{variables}}...",
            value: state.text,
            onChange: (e) => setState({ text: e.target.value }),
            rows: 3,
          },
        },
      ]}
      handles={handles}
      containerStyle={{
        width: size.width,
        minHeight: size.height,
        transition: "width 0.2s ease, height 0.2s ease",
      }}
      containerRef={containerRef}
    >
      {variables.length > 0 && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-sm:text-xxs">
          Variables: {variables.join(", ")}
        </div>
      )}
    </PrimaryNode>
  );
};
