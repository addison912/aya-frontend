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
            <img
              src={`${domain}/assets/logo-aya_brackett.png`}
              alt="Aya Brackett logo"
            />
          </div>
        </div>
        <ul className="galleries-list row-3">
          {categories.map(category => (
            <li key={category}>
              <Link className="category-link" to={category.replace(/\s+/g, "")}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <nav className="links row-3">
          <ul>
            <li>About</li>
            <li>News</li>
            <li>Shop</li>
          </ul>
        </nav>
        <div className="gallery-toggle">
          {window.location.pathname == "?" ||
          !!window.location.pathname.indexOf("gallery") ? (
            <div>
              <img
                src={require("../assets/images/grid.png")}
                alt="toggle grid gallery"
                id="grid-gallery"
                className="gallery-toggle"
                data="grid"
                onClick={this.props.toggleGalleryLayout}
              />
              <img
                src={require("../assets/images/single.png")}
                alt="toggle single gallery"
                id="single-gallery"
                className="gallery-toggle"
                data="single"
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
