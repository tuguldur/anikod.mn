import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../components/item";
import { useDebounce } from "use-lodash-debounce";
import "./style.scss";
const Search = () => {
  const [value, setValue] = useState("");
  const [franchise, setFranchise] = useState(null);
  const name = useDebounce(value, 600);
  useEffect(() => {
    document.title = 'Хайх | ANIKOD - PRO';
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
    return ()=>{
      document.title = 'ANIKOD - PRO';
    }
  }, [name]);
  return (
    <div className="flex">
      <div className="container" style={{ paddingTop: "25px" }}>
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
        {franchise ? (
          franchise.length ? (
            <div className="anime-result">
              {franchise.map((item) => {
                return <Item {...item} key={item.id} />;
              })}
            </div>
          ) : (
            <div className="not-found">
              <h5>No Results</h5>
              <p
                className="search-cancel"
                onClick={() => {
                  setValue("");
                  setFranchise(null);
                }}
              >
                Cancel
              </p>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Search;
