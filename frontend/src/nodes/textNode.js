import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [state, setState] = useState({
    text: data?.text || '{{input}}',
  });

  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 200, height: 120 });

  // Extract variables from text
  useEffect(() => {
    const foundVars = new Set();
    let match;
    while ((match = VARIABLE_REGEX.exec(state.text)) !== null) {
      foundVars.add(match[1]);
    }
    setVariables(Array.from(foundVars));
  }, [state.text]);

  // Auto-resize textarea and container
  useEffect(() => {
    if (textareaRef.current && containerRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto';
      
      // Calculate new dimensions
      const minWidth = 200;
      const maxWidth = 400;
      const minHeight = 120;
      
      const contentWidth = Math.max(
        textarea.scrollWidth,
        minWidth - 40 // account for padding
      );
      
      const newWidth = Math.min(maxWidth, contentWidth + 40);
      const newHeight = Math.max(minHeight, textarea.scrollHeight + 80);
      
      // Apply new dimensions
      textarea.style.height = `${textarea.scrollHeight}px`;
      setSize({ width: newWidth, height: newHeight });
    }
  }, [state.text]);

  // Generate handles for variables
  const handles = [
    ...variables.map((v, idx) => ({
      type: 'target',
      position: Position.Left,
      id: v,
      className: "bg-purple-500 dark:bg-purple-400",
      style: { 
        top: `${20 + idx * 24}px`,
      },
      data: { label: v } // Optional: show variable name on hover
    })),
    { 
      type: 'source', 
      position: Position.Right, 
      id: 'output',
      className: "bg-blue-500 dark:bg-blue-400"
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
          label: '',
          key: 'text',
          type: 'textarea',
          inputProps: {
            ref: textareaRef,
            className: `
              w-full p-2 border border-gray-300 dark:border-gray-600 rounded
              bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
              focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden
              min-h-[60px]
            `,
            placeholder: "Enter text with {{variables}}...",
            value: state.text,
            onChange: (e) => setState({ text: e.target.value }),
            rows: 3
          },
        },
      ]}
      handles={handles}
      containerStyle={{ 
        width: size.width, 
        minHeight: size.height,
        transition: 'width 0.2s ease, height 0.2s ease'
      }}
      containerRef={containerRef}
    >
      {variables.length > 0 && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Variables: {variables.join(', ')}
        </div>
      )}
    </PrimaryNode>
  );
};