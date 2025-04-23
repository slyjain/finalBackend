import { useContext, useEffect, useRef, useLayoutEffect } from "react";
import rough from "roughjs";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants"
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";

function Board() {
    const canvasRef = useRef();
    const textAreaRef = useRef();
    const { elements, boardMouseDownHandler, boardMouseMoveHandler, boardMouseUpHandler, toolActionType, textAreaBlurHandler, undo, redo } = useContext(boardContext);
    const { toolboxState } = useContext(toolboxContext);
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const roughCanvas = rough.canvas(canvas);

    }, []);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.ctrlKey && event.key === "z") {
                undo();
            } else if (event.ctrlKey && event.key === "y") {
                redo();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [undo, redo]);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.save();

        const roughCanvas = rough.canvas(canvas);
        elements.forEach((element) => {
            switch (element.type) {
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.CIRCLE:
                case TOOL_ITEMS.ARROW:
                    roughCanvas.draw(element.roughEle);
                    break;
                case TOOL_ITEMS.BRUSH:
                    context.fillStyle = element.stroke;
                    context.fill(element.path);
                    context.restore();
                    break;
                case TOOL_ITEMS.TEXT:
                    context.textBaseline = "top";
                    context.font = `${element.size}px Caveat`;
                    context.fillStyle = element.stroke;
                    context.fillText(element.text, element.x1, element.y1);
                    context.restore();
                    break;
                default:
                    throw new Error("Type not recognized");
            }
        });
        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [elements]);
    useEffect(() => {
        const textarea = textAreaRef.current;
        if (toolActionType === TOOL_ACTION_TYPES.WRITING) {
            setTimeout(() => {
                textarea.focus();
            }, 0);
        }
    }, [toolActionType]);
    const handleBoardMouseDown = (event) => {
        boardMouseDownHandler(event, toolboxState);
    };
    const handleBoardMouseUp = (event) => {
        boardMouseUpHandler();
    }
    const handleBoardMouseMove = (event) => {
        // if (toolActionType == TOOL_ACTION_TYPES.DRAWING) {
        boardMouseMoveHandler(event);
        // }
    }
    return (
        <>
            {toolActionType === TOOL_ACTION_TYPES.WRITING && (
                <textarea
                    type="text"
                    ref={textAreaRef}
                    className="fixed border-none bg-transparent resize-none outline-none p-0 m-0 w-auto h-auto overflow-hidden text-inherit font-[inherit] text-[inherit] leading-[inherit] font-caveat"

                    style={{
                        top: elements[elements.length - 1].y1,
                        left: elements[elements.length - 1].x1,
                        fontSize: `${elements[elements.length - 1]?.size}px`,
                        color: elements[elements.length - 1]?.stroke,
                    }}
                    onBlur={(event) => textAreaBlurHandler(event.target.value)}
                />
            )}
            <canvas
                id="canvas"
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ backgroundColor: "#1c1c1e" }}
                onMouseDown={handleBoardMouseDown}
                onMouseUp={handleBoardMouseUp}
                onMouseMove={handleBoardMouseMove}
            />
        </>
    );
}

export default Board;
