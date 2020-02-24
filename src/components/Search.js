/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <form className="search-container" onSubmit={this.props.search}>
        <div className="search-wrapper">
          <input
            type="text"
            className="search"
            placeholder="FIND SOMETHING"
            onChange={this.props.handleSearchInput}
            value={this.props.searchInput}
          ></input>

          <button
            type="submit"
            onClick={this.props.search}
            aria-labelledby="submit button"
            name="search"
          >
            <img
              src={require("../assets/images/search.svg")}
              alt="search icon"
            ></img>
          </button>
        </div>
      </form>
    );
  }
}

export default Search;
