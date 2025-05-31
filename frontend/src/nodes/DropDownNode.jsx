import { useState } from 'react';
import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const DropDownNode = ({ id, data }) => {
  const [state, setState] = useState({
    selectedOption: data?.selectedOption || 'Option1',
  });

  return (
    <PrimaryNode
      id={id}
      title="Dropdown Node"
      state={state}
      setState={setState}
      fields={[
        { label: 'Select Option', key: 'selectedOption', type: 'select', options: ['Option1', 'Option2', 'Option3'] },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: 'out' },
        { type: 'target', position: Position.Left, id: 'in' },
      ]}
    />
  );
};
