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
          <ul className="projects">
            {categories.map(category => (
              <li
                key={category}

                // to={category.replace(/\s+/g, "")}
              >
                <Link
                  to={`/${category.replace(/\/?\s+/g, "-")}`}
                  onClick={() => this.props.categoryChangeHandler(category)}
                  className={
                    category == this.props.category
                      ? "category-link category-link-selected"
                      : "category-link"
                  }
                >
                  {category}{" "}
                </Link>
              </li>
            ))}
          </ul>
          <Links selectedLink={this.props.selectedLink} />
        </div>
      </nav>
    );
  }
}

export default LeftNav;
