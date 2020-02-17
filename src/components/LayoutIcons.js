/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";

class LayoutIcons extends Component {
  render() {
    return (
      <div className="gallery-toggle">
        {window.location.pathname == "?" ||
        !!window.location.pathname.indexOf("gallery") ? (
          <div className="layout-icon-container">
            <div
              className="icon-wrapper"
              layout-data="grid"
              onClick={this.props.toggleGalleryLayout}
              role="button"
            >
              <img
                src={require("../assets/images/grid.svg")}
                alt="toggle grid gallery"
                className={
                  this.props.layout == "grid"
                    ? "gallery-toggle selected-layout-icon"
                    : "gallery-toggle unselected-layout-icon"
                }
              />
              <span>GRID</span>
            </div>
            <div
              className="icon-wrapper"
              layout-data="single"
              onClick={this.props.toggleGalleryLayout}
              role="button"
            >
              <img
                src={require("../assets/images/single.svg")}
                alt="toggle single gallery"
                className={
                  this.props.layout == "single"
                    ? "gallery-toggle selected-layout-icon"
                    : "gallery-toggle unselected-layout-icon"
                }
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
