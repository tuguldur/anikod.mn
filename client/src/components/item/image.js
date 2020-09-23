import React, { useState } from "react";
const Image = ({ src, alt }) => {
  const [state, setState] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={`image${state ? " loaded" : ""}`}
      onLoad={() => setState(true)}
    />
  );
};
export default Image;
