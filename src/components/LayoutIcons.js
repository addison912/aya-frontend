/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";

class LayoutIcons extends Component {
  render() {
    return (
      <div className="gallery-toggle no-highlight">
        {window.location.pathname == "?" ||
        !!window.location.pathname.indexOf("gallery") ? (
          <div className="layout-icon-container">
            <div
              className={
                this.props.layout == "grid"
                  ? "icon-wrapper selected-layout-icon"
                  : "icon-wrapper unselected-layout-icon"
              }
              onClick={() => this.props.toggleGalleryLayout("grid")}
              role="button"
            >
              <img
                src={require("url:../assets/images/grid.svg")}
                alt="toggle grid gallery"
                className="gallery-toggle"
              />
              <span>GRID</span>
            </div>
            <div
              className={
                this.props.layout == "single"
                  ? "icon-wrapper selected-layout-icon"
                  : "icon-wrapper unselected-layout-icon"
              }
              onClick={() => this.props.toggleGalleryLayout("single")}
              role="button"
            >
              <img
                src={require("url:../assets/images/single.svg")}
                alt="toggle single gallery"
                className="gallery-toggle"
              />
              <span>SINGLE</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default LayoutIcons;
