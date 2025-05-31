import { useState } from 'react';
import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const ToggleNode = ({ id, data }) => {
  const [state, setState] = useState({
    isEnabled: data?.isEnabled ?? true,
  });

  return (
    <PrimaryNode
      id={id}
      title="Toggle Node"
      state={state}
      setState={setState}
      fields={[
        { label: 'Enabled', key: 'isEnabled', type: 'select', options: ['true', 'false'] },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: 'output' },
        { type: 'target', position: Position.Left, id: 'input' },
      ]}
    />
  );
};
