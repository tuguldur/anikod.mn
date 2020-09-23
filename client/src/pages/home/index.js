import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import { Container } from "../../components";
import Item from "../../components/item";
import { useDebounce } from "use-lodash-debounce";
const Home = () => {
  const [state, setState] = useState(null);
  const [value, setValue] = useState("");
  const [franchise, setFranchise] = useState(null);
  const name = useDebounce(value, 600);
  useEffect(() => {
    if (name) {
      setFranchise(null);
      axios
        .get("https://api.anikodcdn.net/api/franchises", {
          params: {
            name,
            has_titles: true,
          },
        })
        .then((response) => {
          if (response.data) {
            setFranchise(response.data);
          } else setFranchise(null);
        });
    }
  }, [name]);
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
        <div className="search">
          <div className="search-label">Search</div>
          <div className="search-wrap">
            <i className="material-icons">search</i>
            <input
              type="search"
              autoComplete="off"
              className="search-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus={true}
            />
            {value ? (
              <i
                className="material-icons"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setValue("");
                  setFranchise(null);
                }}
              >
                cancel
              </i>
            ) : null}
          </div>
        </div>
        {state && !name
          ? state.map((container) => (
              <Container {...container} key={container.id} />
            ))
          : null}
        {franchise ? (
          franchise.length ? (
            <div className="anime-result">
              {franchise.map((item) => {
                return <Item {...item} key={item.id} />;
              })}
            </div>
          ) : (
            <div className="not-fount">Not Fount UwU</div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Home;
