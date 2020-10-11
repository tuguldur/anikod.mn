import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
const Player = ({ src, sources }) => {
  const video = useRef(null);
  const [media, setMedia] = useState(null);
  useEffect(() => { 
  
  }, [media]);
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
