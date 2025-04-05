import { useContext, useEffect, useRef,useLayoutEffect } from "react";
import rough from "roughjs";
import {TOOL_ACTION_TYPES} from "../../constants"
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";

function Board() {
    const canvasRef = useRef();
    const { elements, boardMouseDownHandler,boardMouseMoveHandler,boardMouseUpHandler,toolActionType } = useContext(boardContext);
    const { toolboxState } = useContext(toolboxContext);
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const roughCanvas = rough.canvas(canvas);

    }, []);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.save();

        const roughCanvas = rough.canvas(canvas);

        elements.forEach((element) => {
            roughCanvas.draw(element.roughEle);
        });

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [elements]);
    const handleBoardMouseDown = (event) => {
        boardMouseDownHandler(event, toolboxState);
      };
    const handleBoardMouseUp=(event)=>{
        boardMouseUpHandler();
    }
    const handleBoardMouseMove=(event)=>{
        if(toolActionType==TOOL_ACTION_TYPES.DRAWING){
        boardMouseMoveHandler(event);}
    }
    return (
        <>
            <canvas
                id="canvas"
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleBoardMouseDown}
                onMouseUp={handleBoardMouseUp}
                onMouseMove={handleBoardMouseMove}
            />
        </>
    );
}

export default Board;
