import { useState } from 'react';
import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const MathNode = ({ id, data }) => {
  const [state, setState] = useState({
    num1: data?.num1 || '',
    num2: data?.num2 || '',
    operation: data?.operation || 'Add',
  });

  return (
    <PrimaryNode
      id={id}
      title="Math Node"
      state={state}
      setState={setState}
      fields={[
        { label: 'Number 1', key: 'num1', type: 'text' },
        { label: 'Number 2', key: 'num2', type: 'text' },
        { label: 'Operation', key: 'operation', type: 'select', options: ['Add', 'Subtract', 'Multiply', 'Divide'] },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: 'result' },
      ]}
    />
  );
};
