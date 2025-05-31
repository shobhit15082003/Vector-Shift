
import { useState } from 'react';
import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const ImageNode = ({ id, data }) => {
  const [state, setState] = useState({
    imageUrl: data?.imageUrl || '',
  });

  return (
    <PrimaryNode
      id={id}
      title="Image Node"
      state={state}
      setState={setState}
      fields={[{ label: 'Image URL', key: 'imageUrl', type: 'text' }]}
      handles={[{ type: 'source', position: Position.Right, id: 'image' }]}
    >
      {state.imageUrl && (
        <img src={state.imageUrl} alt="Preview" width={180} style={{ marginTop: 4 }} />
      )}
    </PrimaryNode>
  );
};
