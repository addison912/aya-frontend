/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { domain, categories } from "../config/constants";
import Links from "./Links";

// require("../assets/images/grid.png")

class HamburgerMenu extends Component {
  render() {
    return (
      <nav
        // className="hamburger-menu"
        className={
          this.props.hamburgerMenu == false
            ? "hamburger-menu hidden-menu"
            : "hamburger-menu visible-menu"
        }
      >
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
        <Links />
      </nav>
    );
  }
}

export default HamburgerMenu;
