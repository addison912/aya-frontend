import React, { Component } from "react";

class SearchMessage extends Component {
  render() {
    return this.props.galleryLength > 0 ? (
      <div id="search-message">
        <h1>Showing results for</h1>
        <h1>{`'${this.props.searchQuery}'`}</h1>
      </div>
    ) : (
      <div id="search-message">
        <h1>No results found for {`'${this.props.searchQuery}'`}</h1>
      </div>
    );
  }
}

export default SearchMessage;
