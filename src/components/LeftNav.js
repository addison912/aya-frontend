/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { domain, categories } from "../config/constants";

// require("../assets/images/grid.png")

class LeftNav extends Component {
  state = {
    message: "",
    galleries: []
  };

  getText() {
    fetch(`${domain}/api/test`)
      .then(res => {
        return res.json();
      })
      .then(text => {
        this.setState({ message: text.message });
      });
  }

  componentDidMount() {
    this.getText();
  }

  render() {
    return (
      <div className="left-nav row-12">
        <div className="row-3">
          <div className="logo">
            <a href="/">
              <img
                src={require("../assets/images/logo-aya_brackett.png")}
                alt="Aya Brackett logo"
                id="logo-image"
              />
            </a>
          </div>
        </div>
        <ul className="galleries-list row-3">
          {categories.map(category => (
            <li
              key={category}

              // to={category.replace(/\s+/g, "")}
            >
              <span
                data={category}
                onClick={this.props.categoryClickHandler}
                className="category-link"
              >
                {category}{" "}
              </span>
            </li>
          ))}
        </ul>
        <nav className="links row-3">
          <ul>
            <li>
              <span>About</span>
            </li>
            <li>
              <span>News</span>
            </li>
            <li>
              <span>Shop</span>
            </li>
          </ul>
        </nav>
        <div className="gallery-toggle">
          {window.location.pathname == "?" ||
          !!window.location.pathname.indexOf("gallery") ? (
            <div className="layout-icon-container">
              <img
                src={require("../assets/images/grid.svg")}
                alt="toggle grid gallery"
                id="grid-gallery"
                className={
                  this.props.layout == "grid"
                    ? "gallery-toggle selected-layout-icon"
                    : "gallery-toggle unselected-layout-icon"
                }
                layout-data="grid"
                onClick={this.props.toggleGalleryLayout}
              />
              <img
                src={require("../assets/images/single.svg")}
                alt="toggle single gallery"
                id="single-gallery"
                className={
                  this.props.layout == "single"
                    ? "gallery-toggle selected-layout-icon"
                    : "gallery-toggle unselected-layout-icon"
                }
                layout-data="single"
                onClick={this.props.toggleGalleryLayout}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default LeftNav;
