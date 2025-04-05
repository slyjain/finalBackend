import React, { useContext } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { RiRectangleLine } from "react-icons/ri";
import { FaSlash,FaRegCircle ,FaArrowRight} from "react-icons/fa";
import { TOOL_ITEMS } from "../../constants";
import boardContext from "../../store/board-context";

const Toolbar = () => {
  const { activeToolItem, changeToolHandler } = useContext(boardContext);

  const containerClasses =
    "absolute left-1/2 top-5 px-3 py-2 flex rounded border border-gray-400 bg-white";
  const toolItemClasses =
    "flex justify-center items-center text-xl p-3 text-black mr-5 last:mr-0 cursor-pointer rounded";
  const hoverClasses = "hover:bg-blue-50 hover:text-gray-700";
  const activeClasses = "bg-blue-200 text-gray-700";

  const tools = [
    { id: TOOL_ITEMS.RECTANGLE, icon: <RiRectangleLine /> },
    { id: TOOL_ITEMS.LINE, icon: <FaSlash /> },
    {id:TOOL_ITEMS.CIRCLE,icon:<FaRegCircle/>},
    {id:TOOL_ITEMS.ARROW,icon:<FaArrowRight/>}
  ];

  return (
    <div
      className={containerClasses}
      style={{
        transform: "translateX(-50%)",
        boxShadow: "1px 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {tools.map(({ id, icon }) => (
        <div
          key={id}
          className={twMerge(
            clsx(toolItemClasses, hoverClasses, {
              [activeClasses]: activeToolItem === id,
            })
          )}
          onClick={() => changeToolHandler(id)}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
