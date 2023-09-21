import Node from "./Node"
import Queue from "./Queue"
let {field,path} = require("../data/pathGrid.js");


/**
 * @desc Does a bfs traversal and finds the shortest path
 * @returns 
 */
async function bfs(obstacles, boundary, start, target, speed) {
  if (start.x === target.x && start.y === target.y) {
    return false;
  }

  let visited = new Map();
  let foundFlag = false;
  let parent = new Map();
  let bfsTraversal = [];
  let q = new Queue();
  let startNode = new Node(start.x, start.y);

  parent.set(startNode, -1);
  q.push(startNode);
  visited.set(`${startNode.x},${startNode.y}`, true);

    while (!q.isEmpty()) {
      let frontNode = q.pop();
      bfsTraversal.push(frontNode);

      let neighbours = getNeighbours(obstacles, boundary, frontNode);
      for (let i = 0; i < neighbours.length; i++) {
        if (visited.get(`${neighbours[i].x},${neighbours[i].y}`) == null) {
          q.push(neighbours[i]);
          visited.set(`${neighbours[i].x},${neighbours[i].y}`, true);
          parent.set(neighbours[i], frontNode);
          field[neighbours[i].x][neighbours[i].y] = 1;
          //for delay
          if(speed !== 0){
            await new Promise( r => setTimeout( r,0));            
          }
          //target found -> stop function
          if (neighbours[i].x == target.x && neighbours[i].y == target.y) {
            target = neighbours[i];
            foundFlag = true;
            break;
          }
        }
      }

      //stop traversal when target found
      if(foundFlag){
        setPath(parent,target,speed)
        break;
      }
    }
 


}

/**
 * 
 * @desc finds the path if target node is found
 * @param {mapping contains key as parent and value as child} parent 
 * @param {soure node} target 
 * @param {*varible to toggle the render speed of path} speed 
 * 
 */
function setPath(parent,target,speed){
  //find path if target node found
  if (!parent.get(target)) {return}
  
  let tempPath = [];
  tempPath.push(target);
  let previous = parent.get(target);
  tempPath.push(previous);
  
  while (previous != -1) { //tracing the path from parent map
    previous = parent.get(previous);
    tempPath.push(previous);
  }

  tempPath.reverse();
  
  if(speed == 0){  //instantly render path
    for(let i=1 ;i < tempPath.length ; i++){
      field[tempPath[i].x][tempPath[i].y] = 0;
      path.push(tempPath[i])
    }
  }
  else{ // slowly render path
      let interval = setInterval(() => {
      let node = tempPath.shift()
      if(node == -1){return;}
      field[node.x][node.y] = 0;
      path.push(node);
      if(tempPath.length === 0){
        clearInterval(interval);
      }
    }, 100);
  }

  
}

/**
 * 
 * @desc Takes a nodes and returns the neighbours of the node
 * @param {matrix with [x,y] denoting if there is obstacle there} obstacles 
 * @param {*matrix with [x,y] denoting the boundary} boundary 
 * @param {*node whose neighbour to find} node 
 * @returns neighbours of the node [up,right,down,left]
 */
function getNeighbours(obstacles, boundary, node) {
  let neighbours = [];
  let x = node.x, y = node.y;
  
  //up
  if (x - 1 >= 0 && obstacles[x - 1][y] === 0 && boundary[x - 1][y] === 0) { 
    let neighbour = new Node(x - 1, y);
    neighbours.push(neighbour);
  }
  //down
  if ( x + 1 < obstacles.length && obstacles[x + 1][y] === 0 && boundary[x + 1][y] === 0) {
    let neighbour = new Node(x + 1, y);
    neighbours.push(neighbour);
  }
  //left
  if (y - 1 >= 0 && obstacles[x][y - 1] === 0 && boundary[x][y - 1] === 0) {
    let neighbour = new Node(x, y - 1);
    neighbours.push(neighbour);
  }
  //right
  if ( y + 1 < obstacles[0].length && obstacles[x][y + 1] === 0 && boundary[x][y + 1] === 0 ) {
    let neighbour = new Node(x, y + 1);
    neighbours.push(neighbour);
  }
  return neighbours;
}

export default bfs;
