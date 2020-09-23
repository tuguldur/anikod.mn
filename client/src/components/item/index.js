import React from "react";
import { Link } from "react-router-dom";
import Image from "./image";
const Item = (item) => {
  return (
    <div className="media-card">
      <Link className="cover" to={`/titles/${item.titles[0].id}`}>
        <Image
          src={`https://api.anikodcdn.net/${item.titles[0].images.poster.md}`}
          alt={item.name}
        />
      </Link>
      <Link to={`/titles/${item.titles[0].id}`} className="name">
        {item.name}
      </Link>
    </div>
  );
};
export default Item;
