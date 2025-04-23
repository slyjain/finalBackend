import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";
import Toolbox from "./components/Toolbox";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8000`)
      .then(res => {
        setData(res.data)
        console.log(res.data);
      })
      .catch(error => console.log("Error fetching data", error))
  }, [])
  return (
    <>
      <BoardProvider>
        <ToolboxProvider>
          <Toolbar />
          <Toolbox />
          <Board />
        </ToolboxProvider>
      </BoardProvider>
    </>
  );
}

export default App;
