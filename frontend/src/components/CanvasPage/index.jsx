import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../store/authProvider";
import Board, { useBoard } from "../Board";
import Toolbar from "../Toolbar";
import BoardProvider from "../../store/BoardProvider";
import ToolboxProvider from "../../store/ToolboxProvider";
import Toolbox from "../Toolbox";
import axios from "axios";

import { getSvgPathFromStroke } from "../../utils/element";
import getStroke from "perfect-freehand";

const rehydrateElements = (elements) => {
  return elements.map(el => {
    if (el.type === "BRUSH") {
      const path = new Path2D(getSvgPathFromStroke(getStroke(el.points)));
      return { ...el, path };
    }
    return el;
  });
};

function CanvasPage() {
    const { canvasId } = useParams();
    const [canvas, setCanvas] = useState({});
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchCanvas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/canvas/load/${canvasId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCanvas({
                    ...response.data,
                    elements: rehydrateElements(response.data.elements)
                  });
                  
                console.log(response.data.elements)
                console.log(canvas);
            } catch (error) {
                console.error("Failed to load Canvas", error);
            }
        };

        if (canvasId && token) {
            fetchCanvas();
        }
    }, [canvasId, token]);

    // useEffect(() => {

    //     if (!canvas?._id || !elements || !token) return;

    //     const updateCanvas = async () => {
    //         try {
    //             console.log("Update canvas called")
    //             await axios.put(
    //                 "http://localhost:8000/api/canvas/update",
    //                 {
    //                     canvasId: canvas._id,
    //                     elements: elements,
    //                 },
    //                 {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 }
    //             );
    //             console.log("Canvas updated");
    //         } catch (error) {
    //             console.error("Canvas update failed", error);
    //         }
    //     };

    //     const debounce = setTimeout(updateCanvas, 1000);
    //     return () => clearTimeout(debounce);
    // }, [elements]);


    if (!canvas?.elements) {
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;
      }
      
      return (
        <div>
          <BoardProvider initialElements={canvas.elements}>
            <ToolboxProvider>
              <Toolbar />
              <Toolbox />
              <Board />
            </ToolboxProvider>
          </BoardProvider>
        </div>
      );
      
      
}

export default CanvasPage;
