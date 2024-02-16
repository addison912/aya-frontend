import React, { Component } from "react";
import BackButton from "./BackButton";
import LayoutIcons from "./LayoutIcons";
import Search from "./Search";

class TopNav extends Component {
  render() {
    return (
      <div className="topNav">
        <div className="topNav-icons">
          {this.props.view == "gallery" && this.props.galleries.length > 1 ? (
            <BackButton
              category={this.props.category}
              categoryChangeHandler={this.props.categoryChangeHandler}
            />
          ) : null}
          <LayoutIcons
            layout={this.props.layout}
            toggleGalleryLayout={this.props.toggleGalleryLayout}
          />
        </div>
        {this.props.location == "Main" ? (
          <Search
            className="search-component"
            search={this.props.search}
            searchInput={this.props.searchInput}
            handleSearchInput={this.props.handleSearchInput}
          />
        ) : null}
      </div>
    );
  }
}

export default TopNav;
