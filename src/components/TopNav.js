import React, { Component } from "react";
import BackButton from "./BackButton";
import LayoutIcons from "./LayoutIcons";
import Search from "./Search";
import SearchMessage from "./SearchMessage";

class TopNav extends Component {
  render() {
    return (
      <div className="topNav">
        {this.props.layout == "grid" && this.props.category == "Search" ? (
          <SearchMessage
            searchQuery={this.props.searchQuery}
            galleryLength={this.props.galleryLength}
          ></SearchMessage>
        ) : this.props.view == "gallery" && this.props.galleries.length > 1 ? (
          <div className="topNav-icons">
            <BackButton
              category={this.props.category}
              categoryChangeHandler={this.props.categoryChangeHandler}
            />

            <LayoutIcons
              layout={this.props.layout}
              toggleGalleryLayout={this.props.toggleGalleryLayout}
            />
          </div>
        ) : null}

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
