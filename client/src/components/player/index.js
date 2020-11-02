import React from "react";
import "./style.scss";
const Player = ({ src, timestamps, skip }) => {
  return (
    <div className="player">
      <video
        id="player"
        src={src}
        controls
        onTimeUpdate={(e) => {
          e.persist();
          if (skip === 1) {
            if (
              timestamps.op_start &&
              Number(timestamps.op_start) ===
                Number(e.target.currentTime.toFixed())
            ) {
              console.log("Opening Jumped to: " + timestamps.op_end);
              e.target.currentTime = Number(timestamps.op_end);
            }
            if (
              timestamps.ed_start &&
              Number(timestamps.ed_start) ===
                Number(e.target.currentTime.toFixed())
            ) {
              console.log("Ending Jumped to: " + timestamps.ed_end);
              e.target.currentTime = Number(timestamps.ed_end);
            }
          }
        }}
      ></video>
    </div>
  );
};
export default Player;
