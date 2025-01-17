import React from "react";
import Item from "../item/index";
const Container = (props) => {
  const { name, items, id } = props;
  return (
    <div className="anime-container" key={id}>
      <div className="title">
        <h5>{name}</h5>
      </div>
      <div className="anime-result">
        {items.map((item) => (
          <Item {...item.franchise} key={item.id} home={true} />
        ))}
      </div>
    </div>
  );
};
export default Container;
