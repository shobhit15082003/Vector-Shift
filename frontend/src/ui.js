import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ImageNode } from './nodes/imageNode';
import 'reactflow/dist/style.css';
import { MathNode } from './nodes/MathNode';
import { ToggleNode } from './nodes/ToggleNode';
import { DropDownNode } from './nodes/DropDownNode';
import { LabelNode } from './nodes/LabelNode';

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
  dropDown: DropDownNode,
  label:LabelNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // Access store values directly
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer?.getData('application/reactflow');
      
      if (data) {
        try {
          const appData = JSON.parse(data);
          const type = appData?.nodeType;

          if (type && reactFlowInstance) {
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
        } catch (error) {
          console.error('Error parsing dropped node data:', error);
        }
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
      className="w-[98vw] mb-5 mx-4 h-[65vh] bg-[#f8fafc] dark:bg-[#afc2e3] rounded-lg shadow-sm border border-[#26518a] dark:border-2 dark:border-[#eeeff1] max-sm:w-[96vw] max-sm:mx-2 max-sm:h-[60vh]"
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
        fitView
      >
        <Background 
          variant="dots"
          color="#94a3b8"  
          gap={gridSize}
          size={1.5} 
          className="opacity-80 dark:opacity-60" 
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
          maskColor="rgba(0, 0, 0, 0.05)"
          className="bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition duration-300 ease-in-out hover:scale-105 hover:border-slate-500 hover:dark:border-blue-800
                     max-sm:scale-75 max-sm:bottom-2 max-sm:right-2 max-sm:hover:scale-90"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};