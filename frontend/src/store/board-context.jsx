import { createContext } from "react";

const boardContext=createContext({
    activeToolItems:"",
    elements:[],
    toolActionType:"",
    boardMouseDownHandler:()=>{},
    boardMouseUpHandler:()=>{},
    boardMouseMoveHandler:()=>{},
    changeToolHandler:()=>{}
})
export default boardContext;