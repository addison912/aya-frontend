/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import ImageSpacer from "./ImageSpacer";

class CategoryGrid extends Component {
  render() {
    return (
      <div className="gallery-content">
        {this.props.galleries.map((gallery, i) => (
          <figure
            key={i}
            className="grid-image gallery-image"
            data={i}
            onClick={() => this.props.galleryClick(gallery)}
            role="button"
            style={{
              order: gallery.order ? gallery.order : this.props.galleries.length
            }}
          >
            <img
              src={`${domain}/uploads/photos/${
                gallery.category.toLowerCase() == "advertising"
                  ? "Client-Work"
                  : gallery.category.replace(/\/?\s+/g, "_")
              }/${gallery.name
                .replace(/\/?\s+/g, "_")
                .replace(/[^\w\s]/gi, "")}/thumb.jpg`}
              alt={
                gallery.photos && gallery.photos[0] && gallery.photos[0].caption
                  ? gallery.photos[0].caption
                  : null
              }
              className="gridImage"
            />
            <figcaption>{gallery.name}</figcaption>
          </figure>
        ))}
        <ImageSpacer />
        <ImageSpacer />
      </div>
    );
  }
}

export default CategoryGrid;
