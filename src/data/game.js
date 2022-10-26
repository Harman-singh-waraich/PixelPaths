import TileMap from "./TileMap.js";
import gridLayout from "./data/gridLayout.js";
import rawBoundary from "./data/boundary.js";

let boundaries = [];
for (let i = 0; i < rawBoundary.length; i += 94) {
  boundaries.push(rawBoundary.slice(i, i + 94));
}

let obstacles = gridLayout;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 16;
let isMouseDown = false;

const tileMap = new TileMap(tileSize);

function gameLoop() {
  tileMap.draw(canvas, ctx, obstacles, boundaries);
}
function pick(event) {
  const bounding = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - bounding.left) / tileSize);
  const y = Math.floor((event.clientY - bounding.top) / tileSize);
  obstacles[y][x] = 1;
  console.log(obstacles[y][x]);
  //   const pixel = ctx.getImageData(x, y, tileSize, tileSize);
  //   const data = pixel.data;
  console.log(x, y);
  // tileMap.changeMapValue(y, x, 3, ctx);
}
canvas.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  pick(event);
});
canvas.addEventListener("mouseup", (event) => {
  isMouseDown = false;
  pick(event);
});
canvas.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    pick(event);
  }
});
setInterval(gameLoop, 1000 / 60);
