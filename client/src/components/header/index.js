import React, { useEffect } from "react";
import { MDCTopAppBar } from "@material/top-app-bar";
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
          {/* <button
            className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
            aria-label="Open navigation menu"
          >
            menu
          </button> */}
          <span className="mdc-top-app-bar__title">Anikod - FREE</span>
        </section>
        <section
          className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
          role="toolbar"
        >
          <button
            className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
            aria-label="Favorite"
          >
            favorite
          </button>
          <button
            className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
            aria-label="Search"
          >
            search
          </button>
          <button
            className="material-icons mdc-top-app-bar__action-item mdc-icon-button"
            aria-label="Options"
          >
            history
          </button>
        </section>
      </div>
    </header>
  );
};
export default Header;
