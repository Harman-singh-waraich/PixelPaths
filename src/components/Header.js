import React from "react";
import "./header.css";
import Node from "../algorithms/Node";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import {field,path} from "../data/pathGrid";

function Header(props) {
  const { canvas, ctx, obstacles, boundary, tileMap,source,target } = props;
  //clear obstacle matrix
  const clearCanvas = () => {
    console.log("ran");
    for (let i = 0; i < obstacles.length; i++) {
      for (let j = 0; j < obstacles[0].length; j++) {
        obstacles[i][j] = 0;
        field[i][j] =0
        }
    }
    while(path.length !== 0){
      path.shift();
    }
    tileMap.draw(canvas, ctx, obstacles, boundary);
  };
  const findPath = () =>{
    let sourceNode = new Node(source.x,source.y);
    let targetNode = new Node(target.x,target.y);

    bfs(tileMap,canvas,ctx,obstacles,boundary,sourceNode,targetNode,69);
  }
  return (
    <section className="navbar">
      <button onClick={clearCanvas}>Clear Field</button>
      <button onClick={findPath}>Find path</button>
    </section>
  );
}

export default Header;
