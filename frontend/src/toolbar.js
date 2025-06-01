import { DraggableNode } from "./draggableNode";
import ThemeToggle from "./ThemeToggle";
import { TextHoverEffect } from "../src/components/ui/text-hover-effect";

export const PipelineToolbar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-5 py-1 gap-2 sm:gap-0">
      <div className="p-2 w-full sm:w-auto overflow-x-auto sm:overflow-visible">
        <div className="mt-2 sm:mt-4 flex gap-2 sm:gap-3 flex-nowrap sm:flex-wrap">
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="image" label="Image" />
          <DraggableNode type="math" label="Math" />
          <DraggableNode type="toggle" label="Toggle" />
        </div>
      </div>

      <h1 className="[&_*]:dark:text-white font-semibold text-xl sm:text-2xl text-white whitespace-nowrap">
        <TextHoverEffect text="VectorShift" />
      </h1>

      <div className="pl-4 sm:pr-4 self-end sm:self-auto">
        <ThemeToggle />
      </div>
    </div>
  );
};
