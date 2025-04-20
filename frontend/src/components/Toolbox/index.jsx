import React, { useContext } from "react";
import clsx from "clsx";
import {
  COLORS,
  FILL_TOOL_TYPES,
  SIZE_TOOL_TYPES,
  STROKE_TOOL_TYPES,
  TOOL_ITEMS,
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
            <div className="mr-2">
              <input
                type="color"
                value={strokeColor}
                onChange={(e) => changeStroke(activeToolItem, e.target.value)}
                className="w-6 h-6 p-0 border-none cursor-pointer"
                title="Pick stroke color"
              />
            </div>

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
            {/* Fill color picker and "no fill" toggle */}
            {fillColor === null ? (
              <div
                className={clsx(
                  "w-6 h-6 border border-gray-300 bg-white flex items-center justify-center cursor-pointer mr-2",
                  "after:content-[''] after:w-4 after:h-0.5 after:bg-red-500 after:rotate-45 after:absolute"
                )}
                onClick={() => changeFill(activeToolItem, COLORS.BLACK)}
                title="Use fill"
              ></div>
            ) : (
              <div className="mr-2">
                <input
                  type="color"
                  value={fillColor}
                  onChange={(e) => changeFill(activeToolItem, e.target.value)}
                  className="w-6 h-6 p-0 border-0 cursor-pointer"
                  title="Pick fill color"
                />
              </div>
            )}

            <div
              className={clsx(
                "w-6 h-6 border border-gray-300 bg-white flex items-center justify-center cursor-pointer mr-2",
                fillColor === null && "shadow-[0_0_0_2px_#4a47b1]"
              )}
              onClick={() => changeFill(activeToolItem, null)}
              title="No fill"
            >
              <div className="w-4 h-4 bg-gray-300 relative">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-red-600 rotate-45"></div>
              </div>
            </div>

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
          <div className={activeToolItem === TOOL_ITEMS.TEXT ? "block mb-1" : "block mb-1"}>
            {activeToolItem === TOOL_ITEMS.TEXT ? "Font Size" : "Brush Size"}
          </div>

          <input
            type="range"
            min={activeToolItem === TOOL_ITEMS.TEXT ? 12 : 1}
            max={activeToolItem === TOOL_ITEMS.TEXT ? 64 : 10}

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
