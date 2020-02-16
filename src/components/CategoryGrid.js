/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import ImageSpacer from "./ImageSpacer";

class CategoryGrid extends Component {
  // componentDidMount() {
  //   if (this.props.galleries.length < 4 && this.props.galleries.length > 1) {
  //     console.log(this.props.galleries.length);
  //     document.querySelector(".gallery-grid").a;
  //   }
  // }
  render() {
    return (
      <div className="gallery-grid">
        {this.props.galleries.map((gallery, i) => (
          <div
            className="gridImageWrapper"
            key={i}
            data={i}
            onClick={this.props.galleryClick}
            role="button"
          >
            <img
              src={`${domain}/uploads/photos/${gallery.category.replace(
                /\/?\s+/g,
                "_"
              )}/${gallery.name.replace(/\/?\s+/g, "_")}/${
                gallery.photos[0].location
              }`}
              alt={
                gallery.photos && gallery.photos[0] && gallery.photos[0].caption
                  ? gallery.photos[0].caption
                  : null
              }
              className="gridImage"
            />
            <p className="caption">{gallery.name}</p>
          </div>
        ))}
        <ImageSpacer />
        <ImageSpacer />
      </div>
    );
  }
}

export default CategoryGrid;
