import React, { useState, useEffect } from "react";
import { MDCMenuSurface } from "@material/menu-surface";
import { MDCRipple } from "@material/ripple";
import axios from "axios";
import "./style.scss";
import { NavLink } from "react-router-dom";
const Titles = (props) => {
  const { id } = props.match.params;
  const [title, setTitle] = useState(null);
  const [franchise, setFranchise] = useState(null);
  const [anilist, setAnilist] = useState(null);
  const [open, setOpen] = useState(false);
  const [episodes, setEpisodes] = useState(null);
  const [downloads, setDownloads] = useState(null);
  useEffect(() => {
    // get title detail
    axios.get("https://api.anikodcdn.net/api/titles/" + id).then((response) => {
      // get franchises
      axios
        .get(
          "https://api.anikodcdn.net/api/franchises/" +
            response.data.franchise_id
        )
        .then((franchies) => setFranchise(franchies.data));
      document.title = response.data.name_rom;
      setTitle(response.data);
      // anilist data (cover,details)
      axios
        .post("https://graphql.anilist.co", {
          query: `
        query ($id: Int) {
          Media (id: $id, type: ANIME) {
            title {
              english
              native
            }
  
            coverImage {
              extraLarge
              large
              medium
            }
  
            bannerImage
  
            averageScore
  
            episodes
            duration
  
            trailer {
              id
              site
            }
  
            startDate {
              year
              month
              day
            }
  
            studios {
              nodes {
                name
              }
            }
          }
        }
      `,
          variables: { id: response.data.anilist_id },
        })
        .then((data) => setAnilist(data.data.data.Media));
    });
    // episodes
    axios
      .get(`https://api.anikodcdn.net/api/titles/${id}/episodes`)
      .then((episode) => setEpisodes(episode.data));
    return () => {
      document.title = "ANIKOD - PRO";
    };
  }, [id]);
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
    });
  });
  return (
    <div className="titles">
      {open ? (
        <div className="dropdown-trigger" onClick={() => setOpen(false)} />
      ) : null}
      {title && anilist && franchise ? (
        <>
          <div className="header-wrap">
            <div
              className="banner"
              style={{ backgroundImage: `url(${anilist.bannerImage})` }}
            >
              <div className="shadow" />
            </div>
            <div className="header">
              <div className="container detail">
                <div className="cover-wrap">
                  <div className="cover-wrap-inner">
                    <img
                      src={
                        "https://api.anikodcdn.net/" + title.images.poster.md
                      }
                      alt="name"
                    />
                  </div>
                </div>
                <div className="content">
                  <div className="pr">
                    <h1
                      onClick={() => {
                        if (franchise.titles.length > 1) {
                          setOpen(true);
                        }
                      }}
                    >
                      {title.name_rom}
                      {franchise.titles.length > 1 ? (
                        <div className="title-dropdown">
                          <i className="material-icons">keyboard_arrow_down</i>
                        </div>
                      ) : null}
                    </h1>
                    {franchise.titles.length > 1 && open ? (
                      <div className="dropdown" onClick={() => setOpen(false)}>
                        {franchise.titles.map((label) => (
                          <div className="option" key={label.id}>
                            <NavLink to={"/titles/" + label.id}>
                              {label.label}
                            </NavLink>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <p className="description">{title.plot}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="container main">
              <div className="sidebar">
                <div className="data">
                  <div className="data-set">
                    <div className="type">Ангилал</div>
                    <div
                      className="value"
                      style={{ textTransform: "capitalize" }}
                    >
                      {franchise.type}
                    </div>
                  </div>
                  <div className="data-set">
                    <div className="type">Нийт анги</div>
                    <div className="value">
                      {title.total_ep}/{episodes.length}
                    </div>
                  </div>
                  <div className="data-set">
                    <div className="type">Төлөв</div>
                    <div className="value">
                      {title.status === "finished" ? "Дууссан" : "Гарч байгаа"}
                    </div>
                  </div>
                  <div className="data-set">
                    <div className="type">Ангийн урт</div>
                    <div className="value">{anilist.duration} минут</div>
                  </div>
                  <div className="data-set">
                    <div className="type">Гарч эхэлсэн</div>
                    <div className="value">{`${anilist.startDate.year}-${anilist.startDate.month}-${anilist.startDate.day}`}</div>
                  </div>
                  <div className="data-set">
                    <div className="type">Үнэлгээ</div>
                    <div className="value">{anilist.averageScore}%</div>
                  </div>
                  <div className="data-set">
                    <div className="type">Нас</div>
                    <div className="value">+{franchise.age_rating}</div>
                  </div>
                  <div className="data-set">
                    <div className="type">Студи</div>
                    <div className="value">
                      {anilist.studios.nodes.map((node, index) => (
                        <div key={index}>
                          {node.name}
                          <br />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="overview">
                <div className="description-wrap">
                  <h2>Description</h2>
                  <p className="description content-wrap">{title.plot}</p>
                </div>
                <div className="watch">
                  <h2>Episodes</h2>
                  <div className="grid-wrap">
                    {episodes.map((episode) => (
                      <div className="episode-card" key={episode.id}>
                        <div
                          className="cover"
                          style={{
                            backgroundImage: `url('https://api.anikodcdn.net/${episode.images.thumbnail.sm}')`,
                          }}
                        />
                        <div className="number">{episode.number}-р анги</div>
                        <div className="download">
                          <div className="mdc-menu-surface--anchor">
                            <button
                              className="download-dropdown material-icons mdc-icon-button"
                              onClick={() => {
                                setDownloads(null);
                                axios
                                  .get(
                                    "https://api.anikodcdn.net/api/episodes/" +
                                      episode.id
                                  )
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Titles;
