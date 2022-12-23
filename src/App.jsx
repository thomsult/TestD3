// @ts-nocheck
import React from "react";
import "./App.css";
import data from "./data2.json"
import useWindowDimensions from './hook/useWindowDimensions';
import GraphComponent from "./GraphComponent";
import Canvas from "./CanvasComponent";
function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="App">
{/*         <GraphComponent data={data} dim={{height, width}} /> */}
        <Canvas data={data} dim={{height, width}}/>
    </div>
  );
}

export default App;
