import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import Item from "../../components/item";
const Browse = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.anikodcdn.net/api/franchises?has_titles=true&sort=id_desc"
      )
      .then((anime) => setState(anime.data));
  }, []);
  return (
    <div className="container browse">
      {state ? (
        <div className="anime-result">
          {state.map((item) => {
            return <Item {...item} key={item.id} />;
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
export default Browse;
