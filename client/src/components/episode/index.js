import React, { useEffect, useState } from "react";
import { MDCMenuSurface } from "@material/menu-surface";
import { MDCRipple } from "@material/ripple";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.scss";
const Episode = (props) => {
  const [downloads, setDownloads] = useState(null);
  useEffect(() => {
    // download dropdown
    const menuEls = Array.from(document.querySelectorAll(".mdc-menu-surface"));
    menuEls.forEach((menuEl) => {
      const menu = new MDCMenuSurface(menuEl);
      const dropdownToggle = menuEl.parentElement.querySelector(
        ".download-dropdown"
      );
      dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        menu.open();
      });
      // dropdown ripple
      const icons = document.querySelectorAll(".mdc-icon-button");
      icons.forEach((icon) => (new MDCRipple(icon).unbounded = true));
      // list ripple
      const lists = document.querySelectorAll(".mdc-list-item");
      lists.forEach((list) => new MDCRipple(list));
    });
  });
  return (
    <div className="episode-card">
      <Link to={"/stream/" + props.id}>
        <div
          className="cover"
          style={{
            backgroundImage: `url('https://api.anikodcdn.net/${props.images.thumbnail.sm}')`,
          }}
        />
        <div className="cover-overlay"></div>
        <div className="cover-button material-icons">play_arrow</div>
      </Link>
      <div className="number">{props.number}-р анги</div>
      <div className="download">
        <div className="mdc-menu-surface--anchor">
          <button
            className="download-dropdown material-icons mdc-icon-button"
            onClick={() => {
              setDownloads(null);
              axios
                .get("https://api.anikodcdn.net/api/episodes/" + props.id)
                .then((data) => setDownloads(data.data.vods));
            }}
          >
            get_app
          </button>
          <div className="mdc-menu-surface">
            <div className="mdc-list">
              {downloads ? (
                downloads.map((link, index) =>
                  link ? (
                    <a
                      href={`https://anikodcdn.net/stream?id=${link.id}&dl=1`}
                      className="mdc-list-item"
                      key={index}
                      download
                    >
                      <span className="mdc-list-item__ripple"></span>
                      Download {link.resolution}p
                    </a>
                  ) : null
                )
              ) : (
                <div className="loading">Loading</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Episode;
