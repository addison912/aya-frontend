/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { categories } from "../config/constants";
import Links from "./Links";
import Search from "./Search";

// require("../assets/images/grid.png")

class HamburgerMenu extends Component {
  render() {
    return (
      <div
        className={
          this.props.hamburgerMenu == false
            ? "hamburger-menu hidden-menu"
            : "hamburger-menu visible-menu"
        }
      >
        <Search
          id="search"
          search={this.props.search}
          searchInput={this.props.searchInput}
          handleSearchInput={this.props.handleSearchInput}
        />

        <ul className="projects">
          {categories.map(category => (
            <li
              key={category}

              // to={category.replace(/\s+/g, "")}
            >
              <Link
                to={`/${category}`}
                data={category}
                onClick={this.props.categoryClickHandler}
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
        <Links toggleHamburgerMenu={this.props.toggleHamburgerMenu} />
      </div>
    );
  }
}

export default HamburgerMenu;
