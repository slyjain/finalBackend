import React, { useContext } from "react";
import clsx from "clsx";
import {
  COLORS,
  FILL_TOOL_TYPES,
  SIZE_TOOL_TYPES,
  STROKE_TOOL_TYPES,
} from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";

const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext);
  const { toolboxState, changeStroke, changeFill, changeSize } =
    useContext(toolboxContext);

  const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;
  const size = toolboxState[activeToolItem]?.size;

  return (
    <div
      className="absolute top-1/2 left-5 text-sm border border-gray-400 bg-white p-4 rounded shadow-md"
      style={{ transform: "translateY(-50%)" }}
    >
      {STROKE_TOOL_TYPES.includes(activeToolItem) && (
        <div className="mb-6 first:pt-5 last:pb-5 px-4">
          <div className="block mb-1 font-medium">Stroke</div>
          <div className="flex flex-wrap items-center">
            {Object.keys(COLORS).map((k) => (
              <div
                key={k}
                className={clsx(
                  "inline-block w-5 h-5 rounded mr-1 last:mr-0 cursor-pointer",
                  strokeColor === COLORS[k] &&
                    "border border-gray-300 shadow-[0_0_0_1px_#4a47b1]"
                )}
                style={{ backgroundColor: COLORS[k] }}
                onClick={() => changeStroke(activeToolItem, COLORS[k])}
              />
            ))}
          </div>
        </div>
      )}

      {FILL_TOOL_TYPES.includes(activeToolItem) && (
        <div className="mb-6 last:mb-0 first:pt-5 last:pb-5 px-4">
          <div className="block mb-1 font-medium">Fill Color</div>
          <div className="flex flex-wrap items-center">
            {Object.keys(COLORS).map((k) => (
              <div
                key={k}
                className={clsx(
                  "inline-block w-5 h-5 rounded mr-1 last:mr-0 cursor-pointer",
                  fillColor === COLORS[k] &&
                    "border border-gray-300 shadow-[0_0_0_1px_#4a47b1]"
                )}
                style={{ backgroundColor: COLORS[k] }}
                onClick={() => changeFill(activeToolItem, COLORS[k])}
              />
            ))}
          </div>
        </div>
      )}

      {SIZE_TOOL_TYPES.includes(activeToolItem) && (
        <div className="mb-6 last:mb-0 first:pt-5 last:pb-5 px-4">
          <div className="block mb-1 font-medium">Brush Size</div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={size}
            onChange={(event) =>
              changeSize(activeToolItem, event.target.value)
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Toolbox;
