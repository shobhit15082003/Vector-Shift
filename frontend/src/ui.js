import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import {ImageNode} from './nodes/imageNode';
import 'reactflow/dist/style.css';
import { MathNode } from './nodes/MathNode';
import { ToggleNode } from './nodes/ToggleNode';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  image: ImageNode,
  math: MathNode,
  toggle: ToggleNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (!type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className="w-[98vw] mb-5 mx-4 h-[72vh] bg-[#f8fafc] dark:bg-[#afc2e3] rounded-lg shadow-sm border border-[#e2e8f0] dark:border-[#2d3748] max-sm:w-[96vw] max-sm:mx-2 max-sm:h-[60vh]"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        minZoom={0.5}
      >
        
        <Background 
          variant="dots"
          color="#94a3b8"  
          darkColor="#38465a"  
          gap={gridSize}
          size={1.5} 
          className="opacity-80" 
        />
        
        <Controls 
          className="[&>button]:bg-white [&>button]:shadow-sm [&>button]:border [&>button]:border-gray-200
                    hover:[&>button]:bg-gray-50
                    [&>button]:dark:bg-gray-700 [&>button]:dark:border-gray-600
                    hover:[&>button]:dark:bg-gray-600
                    max-sm:[&>button]:p-1 max-sm:[&>button]:text-xs"
        />
        
        <MiniMap 
          nodeColor="#e2e8f0"
          darkNodeColor="#4a5568"
          className="bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition duration-300 ease-in-out hover:scale-105  hover:border-slate-500 hover:dark:border-blue-800
                     max-sm:scale-75 max-sm:bottom-2 max-sm:right-2 max-sm:hover:scale-90"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};