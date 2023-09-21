import Node from "./Node"
let {field,path} = require("../data/pathGrid.js");
/**
 * @desc Does a dsfs traversal and finds the path between source node and target node.
 */
async function dfs(obstacles, boundary, start, target, speed) {
  if (start.x === target.x && start.y === target.y) {
    return false;
  }

  let visited = new Map();
  let stack = [];
  let parent = new Map();
  let dfsTraversal = [];
  let startNode = new Node(start.x, start.y);
  
  stack.push(startNode)
  parent.set(startNode, -1);

  while(stack.length !== 0){
    let s = stack.pop();
    if(s.x == target.x && s.y == target.y){
      target = s;
      setPath(parent,target,speed)
      break
    }
    if(!visited.get(`${s.x},${s.y}`)){
      if(speed !== 0){
        await new Promise( r => setTimeout( r,0));            
      }
      visited.set(`${s.x},${s.y}`,true)
      field[s.x][s.y] = 1;
      dfsTraversal.push(s)
    }

    let neighbours = getNeighbours(obstacles,boundary,s)
    for(let i = 0;i<neighbours.length;i++){
      if(!visited.get(`${neighbours[i].x},${neighbours[i].y}`)){
        parent.set(neighbours[i],s)
        stack.push(neighbours[i])
      }
    }
    
  }
  console.log(dfsTraversal);
  

}

/**
 * 
 * @desc finds the path if target node is found
 * @param {mapping contains key as parent and value as child} parent 
 * @param {soure node} target 
 * @param {*varible to toggle the render speed of path} speed 
 * 
 */
async function setPath(parent,target,speed){
  //find path if target node found
  if (!parent.get(target)) {
    return
  }
  
  let tempPath = [];
  tempPath.push(target);
  let previous = parent.get(target);
  tempPath.push(previous);
  
  while (previous != -1) { //tracing the path from parent map
    previous = parent.get(previous);
    tempPath.push(previous);
  }

  tempPath.reverse();
  console.log(tempPath);
    for(let i=1 ;i < tempPath.length ; i++){
    if(speed !== 0){
      await new Promise( r => setTimeout( r,0));            
    } 
    field[tempPath[i].x][tempPath[i].y] = 0;
    path.push(tempPath[i])
  }  
  // if(speed == 0){  //instantly render path
  //   for(let i=1 ;i < tempPath.length ; i++){
          // if(speed !== 0){
            // await new Promise( r => setTimeout( r,0));            
          // } 
  //     field[tempPath[i].x][tempPath[i].y] = 0;
  //     path.push(tempPath[i])
  //   }
  // }
  // else{ // slowly render path
  //     let interval = setInterval(() => {
  //     let node = tempPath.shift()
  //     if(node == -1){return;}
  //     field[node.x][node.y] = 0;
  //     path.push(node);

  //     if(tempPath.length === 0){
  //       clearInterval(interval);
  //     }
  //   }, 100);
  // }

  
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
  //right
  if ( y + 1 < obstacles[0].length && obstacles[x][y + 1] === 0 && boundary[x][y + 1] === 0 ) {
    let neighbour = new Node(x, y + 1);
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
  neighbours.reverse()
  return neighbours;
}

// let test = [[0,0,0],
//             [0,0,0],
//             [0,0,0]]
// let obstacle = [[0,0,0],
//             [1,0,0],
//             [0,0,0]]
// let start = new Node(0,0)
// let target = new Node(2,2)

// dfs(test,obstacle,start,target,0)
export default dfs;
