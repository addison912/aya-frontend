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
        <LayoutIcons
          layout={this.props.layout}
          toggleGalleryLayout={this.props.toggleGalleryLayout}
        />
      </div>
    );
  }
}

export default TopNav;
