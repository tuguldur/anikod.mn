import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import Item from "../../components/item";
const Browse = () => {
  const [state, setState] = useState(null);
  const [genres, setGenres] = useState(null);
  const [dropdown, setDropdown] = useState({ sort: false, genre: false });
  const [filter, setFilter] = useState({
    genre: { name: "Бүгд", value: "" },
    sort: { name: "Шинэ", value: "id_desc" },
  });
  const sorts = [
    { name: "A - Z", value: "name_asc" },
    { name: "Z - A", value: "name_desc" },
    { name: "Шинэ", value: "id_desc" },
    { name: "Хуучин", value: "id_asc" },
  ];
  useEffect(() => {
    axios
      .get("https://api.anikodcdn.net/api/genres")
      .then((genre) => setGenres(genre.data));
    axios
      .get(
        "https://api.anikodcdn.net/api/franchises?has_titles=true&sort=id_desc"
      )
      .then((anime) => setState(anime.data));
  }, []);
  useEffect(() => {
    setState(null);
    const genre_id = filter.genre.value
      ? { genre_id: filter.genre.value }
      : null;
    axios
      .get("https://api.anikodcdn.net/api/franchises", {
        params: {
          has_titles: true,
          sort: filter.sort.value,
          ...genre_id,
        },
      })
      .then((anime) => setState(anime.data));
  }, [filter]);
  const open = (type) => {
    setDropdown({ [type]: true });
  };
  const close = (type) => {
    setDropdown({ [type]: false });
  };
  const find = (name, type, value) => {
    setFilter({ ...filter, [type]: { name, value } });
  };
  return (
    <div className="container browse">
      {dropdown.genre || dropdown.sort ? (
        <div
          className="dropdown-trigger"
          onClick={() => setDropdown({ genre: false, sort: false })}
        />
      ) : null}{" "}
      <div className="filter-wrap">
        <div className="filter">
          <div className="name">Төрөл</div>
          <div className="select-wrap">
            <div className="select" onClick={() => open("genre")}>
              <div className="placeholder">{filter.genre.name}</div>
              <i className="material-icons">expand_more</i>
            </div>
          </div>
          {dropdown.genre ? (
            <div className="options" onClick={() => close("genre")}>
              <div className="scroll-wrap">
                <div className="group-title">Төрөл</div>
                <div
                  className="option"
                  onClick={() => find("Бүгд", "genre", "")}
                >
                  <div className="label">
                    <div className="name">Бүгд</div>
                  </div>
                </div>
                {genres
                  ? genres.map((genre) => (
                      <div
                        className="option"
                        key={genre.id}
                        onClick={() => find(genre.name, "genre", genre.id)}
                      >
                        <div className="label">
                          <div className="name">{genre.name}</div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ) : null}
        </div>
        <div className="filter">
          <div className="name">Эрэмбэ</div>
          <div className="select-wrap ">
            <div className="select" onClick={() => open("sort")}>
              <div className="placeholder">{filter.sort.name}</div>
              <i className="material-icons">expand_more</i>
            </div>
          </div>
          {dropdown.sort ? (
            <div className="options" onClick={() => close("sort")}>
              <div className="scroll-wrap">
                <div className="group-title">Эрэмбэ</div>
                {sorts.map((sort, index) => (
                  <div
                    className="option"
                    key={index}
                    onClick={() => find(sort.name, "sort", sort.value)}
                  >
                    <div className="label">
                      <div className="name">{sort.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {state ? (
        <div className="anime-result">
          {state.map((item) => {
            return <Item {...item} key={item.id} />;
          })}
        </div>
      ) : (
        <div className="text-center">*:･ﾟ✧(ꈍᴗꈍ)✧･ﾟ:*</div>
      )}
    </div>
  );
};
export default Browse;
