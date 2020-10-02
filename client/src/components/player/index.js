import React from "react";
import "./style.scss";
const Player = ({ src }) => {
  return <video id="player" src={src} controls></video>;
};
export default Player;
