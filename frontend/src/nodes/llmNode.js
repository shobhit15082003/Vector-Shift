
import { Position } from 'reactflow';
import { PrimaryNode } from '../ParentNode/PrimaryNode';

export const LLMNode = ({ id }) => {
  return (
    <PrimaryNode
      id={id}
      title="LLM"
      state={{}}
      setState={() => {}}
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' },
      ]}
    >
      <span>This is a LLM.</span>
    </PrimaryNode>
  );
};
