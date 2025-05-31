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
  const [size, setSize] = useState({ width: 200, height: 80 });

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
      const ta = textareaRef.current;

      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;

      const newWidth = Math.min(400, Math.max(150, ta.scrollWidth + 40));
      const newHeight = ta.scrollHeight + 60;

      setSize({ width: newWidth, height: newHeight });
    }
  }, [state.text]);

  const handles = [
    ...variables.map((v, idx) => ({
      type: 'target',
      position: Position.Left,
      id: v,
      style: { top: 24 + idx * 24, background: '#555' },
    })),
    { type: 'source', position: Position.Right, id: 'output' },
  ];

  return (
    <PrimaryNode
      id={id}
      title="Text"
      state={state}
      setState={setState}
      fields={[
        {
          label: 'Text',
          key: 'text',
          type: 'text',
          inputProps: {
            ref: textareaRef,
            style: { width: '100%', resize: 'none', overflow: 'hidden' },
            onChange: (e) => setState({ text: e.target.value }),
          },
        },
      ]}
      handles={handles}
      containerStyle={{ width: size.width, height: size.height }}
      containerRef={containerRef}
    />
  );
};
