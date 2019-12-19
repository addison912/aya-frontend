/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";

class CategoryGrid extends Component {
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
      </div>
    );
  }
}

export default CategoryGrid;
