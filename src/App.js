import React, { useRef, useEffect, useState } from "react";
import "./App.css";

import TileMap from "./data/TileMap.js";
import boundary from "./data/boundary";
import obstacles from "./data/gridLayout.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import dragElement from "./components/source.js";
import sourceImg from "./images/source.png";
import targetImg from "./images/target.png";
// let obstacles = gridLayout;


function App() {
  const [isMouseDown, setMOuse] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [algorithm, setAlgorithm] = useState(null);
  const [source, setSource] = useState({ x: 18, y: 13 });
  const [target, setTarget] = useState({ x: 18, y: 64 });

  const tileSize = 16;
  const tileMap = new TileMap(tileSize);

  function pick(event, canvas,ctx) {
    const bounding = canvas.getBoundingClientRect();
    const y = Math.floor((event.clientX - bounding.left) / 16);
    const x = Math.floor((event.clientY - bounding.top) / 16);
    obstacles[x][y] = 1;
    tileMap.drawObstacles(obstacles,boundary,ctx)
  }
  //mouse hover events
  const mouseDown = (e) => {
    setMOuse(true);
    pick(e, canvas,ctx);
  };
  const mouseUp = (e) => {
    setMOuse(false);
  };
  const mouseHover = (e) => {
    if (!isMouseDown) {
      return;
    }
    pick(e, canvas,ctx);
  };

  //load canvas and render image
  useEffect(() => {
    dragElement(document.getElementById("source"),source,setSource,target,setTarget,algorithm);
    dragElement(document.getElementById("target"),source,setSource,target,setTarget,algorithm);
    const canvas = document.getElementById("main");
    const ctx = canvas.getContext("2d");
    setCanvas(canvas);
    setCtx(ctx);
    setInterval(() => {
      tileMap.draw(canvas, ctx, obstacles, boundary);
    }, 1000 / 60);

  });

  return (
    <div style={{
      width:"100vw",
      height:"100vh",
      overflow:"auto",
      position:"relative"
    }}>
      <Header
        canvas={canvas}
        ctx={ctx}
        tileMap={tileMap}
        obstacles={obstacles}
        boundary={boundary}
        source = {source}
        target = {target}
        algorithm = {algorithm}
        setAlgorithm = {setAlgorithm}
      />
      <div className="container">
        <canvas
          id="main"
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          onMouseMove={mouseHover}
          onMouseLeave={mouseUp}
        ></canvas>
      
          <img id="source" src={sourceImg} />
          <img id="target" src={targetImg} />
      
      </div>

      <Footer
        canvas={canvas}
        ctx={ctx}
        tileMap={tileMap}
        obstacles={obstacles}
        boundary={boundary}
      />
    </div>
  );
}

export default App;
