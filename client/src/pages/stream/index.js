import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDCMenuSurface } from "@material/menu-surface";
import { Link } from "react-router-dom";
import { MDCSwitch } from "@material/switch";
import "./style.scss";
// player
import { Player } from "../../components";
const Stream = (props) => {
  const { id } = props.match.params;
  const [episode, setEpisode] = useState(null);
  const [title, setTitle] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [resolution, setResolution] = useState(null);
  const [skip, setSkip] = useState(Number(localStorage.getItem("skip")));
  useEffect(() => {
    // https://api.anikodcdn.net/api/episodes/:id
    axios
      .get("https://api.anikodcdn.net/api/episodes/" + Number(id))
      .then((data) => {
        setEpisode(data.data);
        setResolution(data.data.vods[0].resolution);
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
  useEffect(() => {
    if (title && episode && episodes) {
      var switchEl = new MDCSwitch(document.getElementById("switch-ripple"));
      switchEl.checked = Number(skip) === 1 ? true : false;
    }
  });
  return (
    <div id="stream">
      <div className="modal" role="dialog">
        {title && episode && episodes ? (
          <>
            <div className="modal-header">
              <h1>
                <span>{title.name_mn}</span>
              </h1>
              <div className="action-wrapper">
                <div className="mdc-menu-surface--anchor">
                  <button
                    className="material-icons mdc-icon-button"
                    onClick={() => {
                      const menu = new MDCMenuSurface(
                        document.querySelector("#player-settings")
                      );
                      menu.open();
                    }}
                  >
                    more_vert
                  </button>
                  <div className="mdc-menu-surface" id="player-settings">
                    <div className="menu-title">Quality</div>
                    <div className="mdc-list">
                      {episode.vods.map((res, index) => (
                        <div
                          className={`mdc-list-item${
                            resolution === res.resolution ? " active" : ""
                          }`}
                          key={index}
                          onClick={() => setResolution(res.resolution)}
                        >
                          <span className="mdc-list-item__ripple"></span>
                          {res.resolution}p
                        </div>
                      ))}
                      <span className="mdc-list-item__ripple"></span>
                    </div>
                    <div className="menu-title">Opening/Ending алгасах</div>
                    <div className="settings-item">
                      <div className="mdc-switch" id="switch-ripple">
                        <div className="mdc-switch__track"></div>
                        <div className="mdc-switch__thumb-underlay">
                          <div className="mdc-switch__thumb"></div>
                          <input
                            type="checkbox"
                            className="mdc-switch__native-control"
                            role="switch"
                            onChange={(e) => {
                              localStorage.setItem(
                                "skip",
                                e.target.checked ? 1 : 0
                              );
                              setSkip(e.target.checked ? 1 : 0);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                skip={skip}
                timestamps={episode.timestamps}
                src={`https://anikodcdn.net/static/media/mp4/${episode.title_id}/${episode.number}_${resolution}.mp4`}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Stream;
