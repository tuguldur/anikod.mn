import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.scss";
// player
import { Player } from "../../components";
const Stream = (props) => {
  const { id } = props.match.params;
  const [episode, setEpisode] = useState(null);
  const [title, setTitle] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  useEffect(() => {
    // https://api.anikodcdn.net/api/episodes/:id
    axios
      .get("https://api.anikodcdn.net/api/episodes/" + Number(id))
      .then((data) => {
        setEpisode(data.data);
        // https://api.anikodcdn.net/api/titles/:title_id
        axios
          .get("https://api.anikodcdn.net/api/titles/" + data.data.title_id)
          .then((titles) => {
            setTitle(titles.data);
          });
        // https://api.anikodcdn.net/api/titles/:title_id
        axios
          .get("https://api.anikodcdn.net/api/titles/" + data.data.title_id)
          .then((title_data) => {
            setTitle(title_data.data);
          });
        // https://api.anikodcdn.net/api/titles/:title_id/episodes
        axios
          .get(
            `https://api.anikodcdn.net/api/titles/${data.data.title_id}/episodes`
          )
          .then((episode_data) => {
            setEpisodes(episode_data.data);
          });
      });
  }, [id]);
  return (
    <div id="stream">
      <div className="modal" role="dialog">
        {title && episode && episodes ? (
          <>
            <div className="modal-header">
              <h1>
                <span>
                  {title.name_mn} {episodes.length}/{episode.number}-анги
                </span>
              </h1>
              <div className="close-wrapper">
                <Link
                  to={"/titles/" + episode.title_id}
                  className="material-icons mdc-icon-button"
                >
                  close
                </Link>
              </div>
            </div>
            <div className="modal-player-content">
              <Player
                src={`https://anikodcdn.net/static/media/mp4/${episode.title_id}/${episode.number}_${episode.vods[0].resolution}.mp4`}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Stream;
