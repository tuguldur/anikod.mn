import React from "react";
import { Link } from "react-router-dom";
import Image from "./image";
const Item = (item) => {
  return (
    <div className="media-card">
      <Link
        className="cover"
        to={`/titles/${item.titles[item.titles.length - 1].id}`}
      >
        <Image
          src={`https://api.anikodcdn.net/${
            item.titles[item.titles.length - 1].images.poster.md
          }`}
          alt={item.name}
        />
      </Link>
      <Link
        to={`/titles/${item.titles[item.titles.length - 1].id}`}
        className="name"
      >
        {item.name}
      </Link>
    </div>
  );
};
export default Item;
