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
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link to="/news">
              <span>News</span>
            </Link>
          </li>
          <li>
            <Link to="/shop">
              <span>Shop</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Links;
