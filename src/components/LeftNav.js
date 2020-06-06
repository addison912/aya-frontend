/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Link } from "@reach/router";
import { categories } from "../config/constants";
import Links from "./Links";

class LeftNav extends Component {
  render() {
    return (
      <nav id="left-nav">
        <div className="nav-wrapper">
          <ul className="projects">
            {categories.map(category => (
              <li key={category}>
                <Link
                  to={`/${category.toLowerCase().replace(/\/?\s+/g, "-")}`}
                  onClick={() =>
                    this.props.categoryChangeHandler(category.toLowerCase())
                  }
                  className={
                    category.toLowerCase() ==
                      this.props.category.toLowerCase() &&
                    this.props.location == "Main"
                      ? "category-link category-link-selected"
                      : "category-link"
                  }
                >
                  {category}{" "}
                </Link>
              </li>
            ))}
          </ul>
          <Links selectedLink={this.props.location} />
        </div>
      </nav>
    );
  }
}

export default LeftNav;
