/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";

class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <input type="text" className="search" placeholder="FIND SOMETHING" />
        <img
          src={require("../assets/images/search.svg")}
          alt="search icon"
        ></img>
      </div>
    );
  }
}

export default Search;
