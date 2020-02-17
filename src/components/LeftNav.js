/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { domain, categories } from "../config/constants";
import Links from "./Links";
import LayoutIcons from "./LayoutIcons";

// require("../assets/images/grid.png")

class LeftNav extends Component {
  state = {
    message: "",
    galleries: []
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <ul className="category-list">
            {categories.map(category => (
              <li
                key={category}

                // to={category.replace(/\s+/g, "")}
              >
                <Link to={`/${category}`}>
                  <span
                    data={category}
                    onClick={this.props.categoryClickHandler}
                    className="category-link"
                  >
                    {category}{" "}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Links
            categoryClickHandler={this.props.categoryClickHandler}
            selectedLink={this.props.selectedLink}
          />
          <LayoutIcons
            layout={this.props.layout}
            toggleGalleryLayout={this.props.toggleGalleryLayout}
          />
        </div>
      </nav>
    );
  }
}

export default LeftNav;
