import React, { Component } from "react";
import BackButton from "./BackButton";
import LayoutIcons from "./LayoutIcons";

class TopNav extends Component {
  render() {
    return (
      <div className="topNav-icons">
        {this.props.view == "gallery" && this.props.galleries.length > 1 ? (
          <BackButton
            category={this.props.category}
            categoryChangeHandler={this.props.categoryChangeHandler}
          />
        ) : null}
        {this.props.view == "gallery" ? (
          <LayoutIcons
            layout={this.props.layout}
            toggleGalleryLayout={this.props.toggleGalleryLayout}
          />
        ) : null}
      </div>
    );
  }
}

export default TopNav;
