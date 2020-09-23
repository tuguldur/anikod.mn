import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
const Titles = (props) => {
  const { id } = props.match.params;
  const [title, setTitle] = useState(null);
  const [anilist, setAnilist] = useState(null);
  useEffect(() => {
    axios.get("https://api.anikodcdn.net/api/titles/" + id).then((response) => {
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
      {
        (title,
        anilist ? (
          <div className="header-wrap">
            <div
              className="banner"
              style={{
                background: anilist.bannerImage,
              }}
            ></div>
          </div>
        ) : null)
      }
    </div>
  );
};
export default Titles;
