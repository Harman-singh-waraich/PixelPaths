let {field,path} = require('../data/pathGrid.js');

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.imageSize = 16;
    this.field = this.#image("Map.png");
    // this.grass = this.#image("Grass.png");
    this.grid = this.#image("grid.png");
    this.obstacle = this.#image("rock.png");
    this.flower = this.#image("flower.png");
    this.paw_up = this.#image("paw_up.png");
    this.paw_down = this.#image("paw_down.png");
    this.paw_right = this.#image("paw_right.png");
    this.paw_left = this.#image("paw_left.png");

    this.source = this.#image("source.png");

  }

  #image(fileName) {
    const img = new Image();
    img.src = require(`../images/${fileName}`);
    return img;
  }

  draw(canvas, ctx, obstacles, boundaries) {
    this.#setCanvasSize(canvas);
    ctx.drawImage(this.field, 0, 0);
    this.drawObstacles(obstacles, boundaries, ctx);
   this.drawPath(ctx);
    if (this.showGrid) {
      ctx.drawImage(this.grid, 0, 0);
    }
  }

  drawObstacles(obstacles, boundaries, ctx) {
    for (let i = 0; i < obstacles.length; i++) {
      for (let j = 0; j < obstacles[0].length; j++) {
        if (obstacles[i][j] === 1 && boundaries[i][j] === 0) {
          ctx.drawImage(this.obstacle, j * this.tileSize, i * this.tileSize);
        }
      }
    }
  }
  drawPath(ctx){
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[0].length; j++) {
        if (field[i][j] === 1) {
          ctx.drawImage(this.flower, j * this.tileSize, i * this.tileSize);
        }
      }
    } 
    let i = 1;
    let next,current;
    let target = path[path.length -1];
    
    while(current != target){
      current = path[i];
      next = path[i+1];
      console.log("in path");
      //up
      if(next.x - current.x === -1 && next.y - current.y === 0){
        ctx.drawImage(this.paw_up,current.y* this.tileSize,current.x* this.tilesize);
      }
      //down
      else if( (next.x - current.x === 1) && (next.y - current.y === 0)){
        ctx.drawImage(this.paw_down,current.y* this.tileSize,current.x* this.tilesize);

      }
      //right
      else if((next.x - current.x === 0) && (next.y - current.y === 1)){
        ctx.drawImage(this.paw_right,current.y* this.tileSize,current.x* this.tilesize);

      }
      //left
      else if( (next.x - current.x === 0) && (next.y - current.y === -1)){
        ctx.drawImage(this.paw_left,current.y* this.tileSize,current.x* this.tilesize);
        
      }
      
      current = next;
      i++;
    }
  }
  toggleGrid(showGrid) {
    this.showGrid = showGrid;
  }
  #clearCanvas(canvas, ctx) {
    ctx.fillStyle = "block";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  #setCanvasSize(canvas) {
    canvas.height = 560;
    canvas.width = 1504;
  }
}














// this.path_horizantal = this.#image("path_horizantal.png");
// this.path_vertical = this.#image("path_vertical.png");
// this.path_bottom_right = this.#image("path_bottom_to_right.png");
// this.path_bottom_left = this.#image("path_bottom_to_left.png");
// this.path_top_left = this.#image("path_top_to_left.png");
// this.path_top_right = this.#image("path_top_to_right.png");

//  //top-to-right
//  if((current.x - previous.x == 1) && (current.y - previous.y == 0) && (next.x - current.x == 0) && (next.y - current.y == 1)){
//   ctx.drawImage(this.path_top_right, current.y * this.tileSize, current.x* this.tileSize);
// }
// //top-to-left
// else if((current.x - previous.x == 1) && (current.y - previous.y == 0) && (next.x - current.x == 0) && (next.y - current.y == -1)){
//   ctx.drawImage(this.path_top_left, current.y * this.tileSize, current.x* this.tileSize);
// }
// //bottom-to-right
// else if((current.x - previous.x == -1) && (current.y - previous.y == 0) && (next.x - current.x == 0) && (next.y - current.y == 1)){
//   ctx.drawImage(this.path_bottom_right, current.y * this.tileSize, current.x* this.tileSize);

// }
// //bottom-to-left
// else if((current.x - previous.x == -1) && (current.y - previous.y == 0) && (next.x - current.x == 0) && (next.y - current.y == -1)){
//   ctx.drawImage(this.path_bottom_left, current.y * this.tileSize, current.x* this.tileSize);

// }
// //left-to-top
// else if((current.x - previous.x == 0) && (current.y - previous.y == 1) && (next.x - current.x == -1) && (next.y - current.y == 0)){
//   ctx.drawImage(this.path_top_left, current.y * this.tileSize, current.x* this.tileSize);

// }
// //left-to-bottom
// else if((current.x - previous.x == 0) && (current.y - previous.y == 1) && (next.x - current.x == 1) && (next.y - current.y == 0)){
//   ctx.drawImage(this.path_bottom_left, current.y * this.tileSize, current.x* this.tileSize);

// }
// //right-to-top
// else if((current.x - previous.x == 0) && (current.y - previous.y == -1) && (next.x - current.x == -1) && (next.y - current.y == 0)){
//   ctx.drawImage(this.path_top_right, current.y * this.tileSize, current.x* this.tileSize);

// }
// //right-to-bottom
// else if((current.x - previous.x == 0) && (current.y - previous.y == -1) && (next.x - current.x == 1) && (next.y - current.y == 0)){
//   ctx.drawImage(this.path_bottom_right, current.y * this.tileSize, current.x* this.tileSize);

// }
// //top-to-bottom
// else if((current.x - previous.x == 1) && (current.y - previous.y == 0) && (next.x - current.x == 1) && (next.y - current.y == 0)){
//   ctx.drawImage(this.path_vertical, current.y * this.tileSize, current.x* this.tileSize);

// }
// //bottom-to-top
// else if((current.x - previous.x == -1) && (current.y - previous.y == 0) && (next.x - current.x == -1) && (next.y - current.y == 0)){
//   ctx.drawImage(this.path_vertical, current.y * this.tileSize, current.x* this.tileSize);

// }
// //left-to-right
// else if((current.x - previous.x == 0) && (current.y - previous.y == 1) && (next.x - current.x == 0) && (next.y - current.y == 1)){
//   ctx.drawImage(this.path_horizantal, current.y * this.tileSize, current.x* this.tileSize);

// }
// //right-to-left
// else if((current.x - previous.x == 0) && (current.y - previous.y == -1) && (next.x - current.x == 0) && (next.y - current.y == -1)){
//   ctx.drawImage(this.path_horizantal, current.y * this.tileSize, current.x* this.tileSize);

// }