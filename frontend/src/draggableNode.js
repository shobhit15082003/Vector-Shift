// draggableNode.js

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
      className={`${type} 
        cursor-grab 
        min-w-[80px] 
        h-[60px] 
        flex 
        items-center 
        justify-center 
        flex-col 
        rounded-lg 
        bg-[#1C2536] 
        hover:bg-[#06090f] 
        text-white 
        transition-all 
        duration-200 
        ease-out 
        hover:scale-110
        hover:shadow-lg 
        active:scale-95
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
