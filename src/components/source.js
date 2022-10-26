import boundary from "../data/boundary.js";
import obstacles from "../data/gridLayout.js";
import { field, path } from "../data/pathGrid.js";
import { bfs } from "../algorithms/bfs.js";
import { dfs } from "../algorithms/dfs.js";
import Node from "../algorithms/Node.js";
function clearPath() {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      field[i][j] = 0;
    }
  }
  while(path.length !== 0){
    path.shift();
  }
}
// Make the DIV element draggable:

function dragElement(elmnt, source, setSource, target, setTarget) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var x = 0,
    y = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = e.clientY - 8 + "px";
    elmnt.style.left = e.clientX - 8 + "px";
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    //calculate position relative to canvas
    y = Math.floor((elmnt.offsetLeft - pos2) / 16);
    x = Math.floor((elmnt.offsetTop - pos1 - 96) / 16);

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    if (elmnt.id === "source") {
      let sourceNode = new Node(x, y);
      let targetNode = new Node(target.x, target.y);
      clearPath();
      bfs(obstacles, boundary, sourceNode, targetNode, 0);
    } else if (elmnt.id === "target") {
      let targetNode = new Node(x, y);
      let sourceNode = new Node(source.x, source.y);
      clearPath();
      bfs(obstacles, boundary, sourceNode, targetNode, 0);
    }

    // console.log(x,y);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    if (x < 0 || x > 35 || y < 0 || y > 95 || boundary[x][y] != 0) {
      //reset if out of boundary
      if (elmnt.id === "source") {
        elmnt.style.top = "392px";
        elmnt.style.left = "216px";
      } else if (elmnt.id === "target") {
        elmnt.style.top = "392px";
        elmnt.style.left = "1032px";
      }
    } else {
      elmnt.style.top =
        Math.floor((elmnt.offsetTop - pos2) / 16) * 16 + 8 + "px";
      elmnt.style.left =
        Math.floor((elmnt.offsetLeft - pos1) / 16) * 16 + 8 + "px";

      //set the obstacle at that point to zero
      y = Math.floor(elmnt.offsetLeft / 16);
      x = Math.floor((elmnt.offsetTop - 96) / 16);

      obstacles[x][y] = 0;
      if (elmnt.id === "source") {
        setSource({ x, y });
        console.log(source);
      } else if (elmnt.id === "target") {
        setTarget({ x, y });
        console.log(target);
      }
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default dragElement;
