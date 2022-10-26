import React, { useState } from "react";
import "./footer.css";
import source from "../images/source.png";
import target from "../images/target.png";
import rock from "../images/rock.png";
function Footer(props) {
  const { canvas, ctx, obstacles, boundary, tileMap } = props;
  const [showGrid, setShowGrid] = useState(false);

  const toggleGrid = () => {
    if (!showGrid) {
      setShowGrid(true);
      tileMap.toggleGrid(showGrid);
    } else {
      setShowGrid(false);
      tileMap.toggleGrid(showGrid);
    }
  };
  return (
    <section className="footer">
      <label>
        <img draggable src={source} />
        Player
      </label>
      <label>
        <img draggable src={target} />
        Destination
      </label>
      <label>
        <img draggable src={rock} />
        Obstacle
      </label>
      <button className="button-55" onClick={toggleGrid}>
        Toggle Grid
      </button>
    </section>
  );
}

export default Footer;
