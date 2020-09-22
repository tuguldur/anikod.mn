import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import { Container } from "../../components";
const Home = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    axios
      .get("https://api.anikodcdn.net/api/highlights?extend=true")
      .then((response) => {
        if (response.data) {
          setState(response.data);
        }
      });
  }, []);
  return (
    <div className="home ">
      <div className="container">
        {state
          ? state.map((container) => (
              <Container {...container} key={container.id} />
            ))
          : null}
      </div>
    </div>
  );
};
export default Home;
