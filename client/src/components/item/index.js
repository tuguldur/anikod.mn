import React from "react";
import { Link } from "react-router-dom";
import Image from "./image";
const Item = (item) => {
  return (
    <div className="media-card" key={item.id}>
      <Link className="cover" to={`/titles/${item.title_id}`}>
        <Image
          src={`https://api.anikodcdn.net/${item.franchise.titles[0].images.poster.md}`}
          alt={item.franchise.name}
        />
      </Link>
      <Link to={`/titles/${item.title_id}`} className="name">
        {item.franchise.name}
      </Link>
    </div>
  );
};
export default Item;
