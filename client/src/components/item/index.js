import React from "react";
import { Link } from "react-router-dom";
const Item = (item) => {
  console.log(item.id);
  return (
    <div className="media-card" key={item.id}>
      <Link className="cover" to={`/titles/${item.id}`}>
        <img
          src={`https://api.anikodcdn.net/${item.franchise.titles[0].images.poster.md}`}
          alt={item.franchise.name}
          className="image loaded"
        />
      </Link>
      <Link to={`/titles/${item.id}`} className="name">
        {item.franchise.name}
      </Link>
    </div>
  );
};
export default Item;
