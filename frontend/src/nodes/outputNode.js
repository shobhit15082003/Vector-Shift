import { useState } from 'react';

import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const OutputNode = ({ id, data }) => {
  const [state, setState] = useState({
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data?.outputType || 'Text',
  });

  return (
    <PrimaryNode
      id={id}
      title="Output"
      state={state}
      setState={setState}
      fields={[
        { label: 'Name', key: 'outputName', type: 'text' },
        { label: 'Type', key: 'outputType', type: 'select', options: ['Text', 'Image'] },
      ]}
      handles={[{ type: 'target', position: Position.Left, id: 'value' }]}
    />
  );
};
