import React from "react";
import { Link } from "react-router-dom";
import Image from "./image";
const Item = (item) => {
  return (
    <div className="media-card">
      <Link
        className="cover"
        to={`/titles/${
          item.home ? item.titles[item.titles.length - 1].id : item.titles[0].id
        }`}
      >
        <Image
          src={`https://api.anikodcdn.net/${
            item.home
              ? item.titles[item.titles.length - 1].images.poster.md
              : item.titles[0].images.poster.md
          }`}
          alt={item.name}
        />
      </Link>
      <Link
        to={`/titles/${
          item.home ? item.titles[item.titles.length - 1].id : item.titles[0].id
        }`}
        className="name"
      >
        {item.name}
      </Link>
    </div>
  );
};
export default Item;
