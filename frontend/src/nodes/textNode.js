
import { useState } from 'react';
import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const TextNode = ({ id, data }) => {
  const [state, setState] = useState({
    text: data?.text || '{{input}}',
  });

  return (
    <PrimaryNode
      id={id}
      title="Text"
      state={state}
      setState={setState}
      fields={[{ label: 'Text', key: 'text', type: 'text' }]}
      handles={[{ type: 'source', position: Position.Right, id: 'output' }]}
    />
  );
};
