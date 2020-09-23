import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
const Titles = (props) => {
  const { id } = props.match.params;
  const [title, setTitle] = useState(null);
  const [franchise, setFranchise] = useState(null);
  const [anilist, setAnilist] = useState(null);
  useEffect(() => {
    axios.get("https://api.anikodcdn.net/api/titles/" + id).then((response) => {
      axios
        .get(
          "https://api.anikodcdn.net/api/franchises/" +
            response.data.franchise_id
        )
        .then((franchies) => setFranchise(franchies.data));
      setTitle(response.data);
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
  }, [id]);
  return (
    <div className="titles">
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
                  <h1>{title.name_rom}</h1>
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
                    <div className="value">{title.total_ep}</div>
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
                <div className="watch"></div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Titles;
