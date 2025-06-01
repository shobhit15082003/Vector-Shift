import { DraggableNode } from "./draggableNode";
import ThemeToggle from "./ThemeToggle";
import { TextHoverEffect } from "../src/components/ui/text-hover-effect";

export const PipelineToolbar = () => {
  return (
    <div className="flex justify-between items-center px-5 py-1">
      <div className="p-2">
        <div className="mt-4 flex flex-wrap gap-3">
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="image" label="Image" />
          <DraggableNode type="math" label="Math" />
          <DraggableNode type="toggle" label="Toggle" />
        </div>
      </div>
      <h1 className="[&_*]:dark:text-white font-semibold text-2xl text-white"><TextHoverEffect  text="VectorShift" /></h1>
      <div className="pr-4">
        <ThemeToggle />
      </div>
    </div>
  );
};