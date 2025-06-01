import { useState } from "react";
import { DraggableNode } from "./draggableNode";
import ThemeToggle from "./ThemeToggle";
import { TextHoverEffect } from "../src/components/ui/text-hover-effect";

export const PipelineToolbar = () => {
  const [activeGroup, setActiveGroup] = useState(1);

  const group1 = [
    { type: "customInput", label: "Input" },
    { type: "llm", label: "LLM" },
    { type: "customOutput", label: "Output" },
    { type: "text", label: "Text" },
  ];

  const group2 = [
    { type: "image", label: "Image" },
    { type: "math", label: "Math" },
    { type: "toggle", label: "Toggle" },
    { type: "dropDown", label: "Drop Down" },
    { type: "label", label: "Label" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-5 py-1 gap-2 sm:gap-0 max-sm:px-2 max-sm:py-1 max-sm:min-h-[60px]">
      <div className="p-2 w-full sm:w-auto overflow-x-auto sm:overflow-visible max-sm:p-1 max-sm:overflow-x-auto max-sm:w-[calc(100vw-4rem)]">
        <div className="flex gap-2 mb-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-fit">
          <button
            onClick={() => setActiveGroup(1)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeGroup === 1
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Given
          </button>
          <button
            onClick={() => setActiveGroup(2)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeGroup === 2
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Created
          </button>
        </div>
        
        <div className="mt-2 sm:mt-4 flex gap-2 sm:gap-3 flex-nowrap sm:flex-wrap max-sm:gap-2 max-sm:mt-0">
          {activeGroup === 1
            ? group1.map((node) => (
                <DraggableNode key={node.type} type={node.type} label={node.label} />
              ))
            : group2.map((node) => (
                <DraggableNode key={node.type} type={node.type} label={node.label} />
              ))}
        </div>
      </div>

      <h1 className="[&_*]:dark:!text-white font-semibold text-xl sm:text-2xl text-white whitespace-nowrap max-sm:text-lg max-sm:mx-auto">
        <TextHoverEffect text="VectorShift" />
      </h1>

      <div className="pl-4 sm:pr-4 self-end sm:self-auto max-sm:pl-2 max-sm:absolute max-sm:right-2 max-sm:top-3">
        <ThemeToggle />
      </div>
    </div>
  );
};