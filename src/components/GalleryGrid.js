/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";

class GalleryGrid extends Component {
  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
    return (
      <div className="gallery-content">
        {this.props.gallery.photos.map((photo, i) => (
          <figure
            className="grid-image"
            key={i}
            data={i}
            role="button"
            onClick={this.props.photoClick}
          >
            <img
              src={`${domain}/uploads/photos/${photo.category.replace(
                /\/?\s+/g,
                "_"
              )}/${photo.gallery.replace(/\/?\s+/g, "_")}/${photo.location}`}
              alt={photo.caption}
              className="gridImage"
            />
            {/* <p className="caption">{name}</p> */}
          </figure>
        ))}
      </div>
    );
  }
}

export default GalleryGrid;
