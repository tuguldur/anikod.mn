import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
const Player = ({ src, timestamps, skip }) => {
  const video = useRef(null);
  const [media, setMedia] = useState(null);
  useEffect(() => {
    const skip_enabled = skip
      ? skip === "true" || skip === true
        ? true
        : false
      : false;
    if (video.current && skip_enabled) {
      video.current.addEventListener("timeupdate", () => {
        if (
          timestamps.op_start &&
          Number(timestamps.op_start) ===
            Number(video.current.currentTime.toFixed())
        ) {
          console.log("Opening Jumped to: " + timestamps.op_end);
          video.current.currentTime = Number(timestamps.op_end);
        }
        if (
          timestamps.ed_start &&
          Number(timestamps.ed_start) ===
            Number(video.current.currentTime.toFixed())
        ) {
          console.log("Ending Jumped to: " + timestamps.ed_end);
          video.current.currentTime = Number(timestamps.ed_end);
        }
      });
    }
    console.log("some thing running");
  }, [media, skip, timestamps]);
  return (
    <div className="player">
      <video
        id="player"
        src={src}
        ref={video}
        onLoadedMetadata={(e) => setMedia(e)}
        controls
      ></video>
    </div>
  );
};
export default Player;
