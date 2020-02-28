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
              <span
                onClick={this.props.toggleHamburgerMenu}
                className={
                  this.props.selectedLink == "About" ? "selected-link" : null
                }
              >
                About
              </span>
            </Link>
          </li>
          <li>
            <a href="https://www.instagram.com/ayabrackett/" target="_blank">Instagram</a>
          </li>
          <li>
            <Link to="/news">
              <span
                onClick={this.props.toggleHamburgerMenu}
                className={
                  this.props.selectedLink == "News" ? "selected-link" : null
                }
              >
                News
              </span>
            </Link>
          </li>
          <li>
            <Link to="/shop">
              <span
                onClick={this.props.toggleHamburgerMenu}
                className={
                  this.props.selectedLink == "Shop" ? "selected-link" : null
                }
              >
                Shop
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Links;
