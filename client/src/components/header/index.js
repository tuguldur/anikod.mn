import React, { useEffect } from "react";
import { MDCTopAppBar } from "@material/top-app-bar";
import { Link } from "react-router-dom";
import "./style.scss";
const Header = () => {
  useEffect(() => {
    // Header Instantiation
    new MDCTopAppBar(document.querySelector(".mdc-top-app-bar"));
  }, []);
  return (
    <header className="mdc-top-app-bar mdc-top-app-bar--fixed" id="header">
      <div className="mdc-top-app-bar__row">
        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <Link to="/" className="mdc-top-app-bar__title">
            Anikod - FREE
          </Link>
        </section>
        <section
          className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
          role="toolbar"
        >
          <button
            className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
            aria-label="add"
          >
            border_clear
          </button>
          <Link
            to="/"
            className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
            aria-label="add"
          >
            add
          </Link>
          <button
            className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
            aria-label="add"
          >
            border_clear
          </button>
        </section>
      </div>
    </header>
  );
};
export default Header;
