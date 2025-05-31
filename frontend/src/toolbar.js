// toolbar.js
import { DraggableNode } from "./draggableNode";
import ThemeToggle from "./ThemeToggle";



export const PipelineToolbar = () => {
  return (
    <div className="flex justify-between items-center px-5">
      <div className="p-[10px]">
        <div className="mt-[20px] flex flex-wrap gap-[10px]">
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="image" label="Image" />
          <DraggableNode type="math" label="Math" />
          <DraggableNode type="toggle" label="Toggle" />
        </div>
      </div>
      
      <div>
      <ThemeToggle/>
      </div>
    </div>
  );
};