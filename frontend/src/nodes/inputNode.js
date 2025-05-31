import { useState } from "react";
import { PrimaryNode } from "../ParentNode/PrimaryNode";
import { Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const [state, setState] = useState({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text',
  });

  return (
    <PrimaryNode
      id={id}
      title="Input"
      state={state}
      setState={setState}
      fields={[
        { label: 'Name', key: 'inputName', type: 'text' },
        { label: 'Type', key: 'inputType', type: 'select', options: ['Text', 'File'] },
      ]}
      handles={[{ type: 'source', position: Position.Right, id: 'value' }]}
    />
  );
};