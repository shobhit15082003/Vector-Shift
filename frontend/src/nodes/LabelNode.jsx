import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const LabelNode = ({ id, data }) => {
  const labelText = data?.label || 'This is a label node.';

  return (
    <PrimaryNode
      id={id}
      title="Label Node"
      state={{}}
      setState={() => {}}
      handles={[
        { type: 'target', position: Position.Left, id: 'in' },
        { type: 'source', position: Position.Right, id: 'out' },
      ]}
    >
      <div>{labelText}</div>
    </PrimaryNode>
  );
};
