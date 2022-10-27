import React from "react";
import "./header.css";
import Node from "../algorithms/Node";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import { field, path } from "../data/pathGrid";

function Header(props) {
  const { canvas, ctx, obstacles, boundary, tileMap, source, target ,algorithm,setAlgorithm} = props;
  //clear obstacle matrix
  let algorithms = ["Bfs","Dfs"];
  const clearCanvas = () => {
    console.log("ran");
    for (let i = 0; i < obstacles.length; i++) {
      for (let j = 0; j < obstacles[0].length; j++) {
        obstacles[i][j] = 0;
        field[i][j] = 0;
      }
    }
    while (path.length !== 0) {
      path.shift();
    }
  };
  const setAlgo = (algorithm)=>{
    setAlgorithm(algorithm)
  }
  const findPath = () => {
    if(!algorithm){
      return;
    }
    clearCanvas()
    let sourceNode = new Node(source.x, source.y);
    let targetNode = new Node(target.x, target.y);
    switch (algorithm) {
      case "Bfs":
        bfs(obstacles, boundary, sourceNode, targetNode, 69);        
        break;

      case "Dfs":
        dfs(obstacles, boundary, sourceNode, targetNode, 69);
        break;
        
      default:
        break;
    }
  };
  return (
    <section className="navbar">
      <div className="bouncing-text">
        <div className="P">P</div>
        <div className="i">i</div>
        <div className="x">x</div>
        <div className="e">e</div>
        <div className="l">l</div>
        <div className="p">P</div>
        <div className="a">a</div>
        <div className="t">t</div>
        <div className="h">h</div>
        <div className="s">s</div>
        <div className="shadow"></div>
        <div className="shadow-two"></div>
      </div>
      <div className="buttons">
      <button onClick={clearCanvas}>Clear Field</button>
      <button onClick={findPath}>{algorithm ? "Visualise" : "Set Alogrithm"}</button>
      <div className="dropdown">
        <button className="dropbtn">Algorithms</button>
        <div className="dropdown-content">
          {algorithms.map((algorithm)=>{
            return <a onClick={()=>{console.log("setting");setAlgo(algorithm)}}>{algorithm}</a>
          })}
        </div>
      </div>
      </div>
    </section>
  );
}

export default Header;
