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
          <div className="nav-container">
            <Link
              to="/browse"
              className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
              aria-label="Үзвэр"
            >
              apps
            </Link>
            <Link
              to="/search"
              className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
              aria-label="Search"
            >
              search
            </Link>
          </div>
        </section>
      </div>
    </header>
  );
};
export default Header;
