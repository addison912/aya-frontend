/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { domain } from "../config/constants";
import { Router, navigate, Link } from "@reach/router";

class Links extends Component {
  render() {
    return (
      <nav className="links">
        <ul>
          <li>
            <Link to="/about">
              <span onClick={this.props.toggleHamburgerMenu}>About</span>
            </Link>
          </li>
          <li>
            <Link to="/news">
              <span onClick={this.props.toggleHamburgerMenu}>News</span>
            </Link>
          </li>
          <li>
            <Link to="/shop">
              <span onClick={this.props.toggleHamburgerMenu}>Shop</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Links;
