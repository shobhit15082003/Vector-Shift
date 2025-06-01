export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`
        cursor-grab 
        min-w-[70px] xs:min-w-[80px]  // Slightly smaller on very small screens
        h-[50px] xs:h-[60px]          // Smaller height on mobile
        flex items-center justify-center flex-col
        rounded-lg border-2
        bg-white dark:bg-[#1E293B]
        border-slate-200 dark:border-slate-600
        text-slate-800 dark:text-slate-100
        transition-all duration-200 ease-out
        hover:bg-slate-50 dark:hover:bg-[#0F172A]
        hover:border-blue-500 dark:hover:border-blue-400
        hover:text-blue-600 dark:hover:text-blue-300
        hover:scale-[1.02] active:scale-[0.98]
        hover:shadow-md active:shadow-sm
        active:bg-slate-100 dark:active:bg-[#1E293B]
        text-xs xs:text-sm             // Smaller text on mobile
        px-2                          // Add some horizontal padding
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <span className="font-medium">{label}</span>
    </div>
  );
};