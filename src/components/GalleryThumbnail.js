import React, { Component } from "react";
import { domain } from "../config/constants";

export class GalleryThumbnail extends Component {
  state = {
    url: `${domain}/uploads/photos/${
      this.props.gallery.category.toLowerCase() == "advertising"
        ? "Client-Work"
        : this.props.gallery.category.replace(/\/?\s+/g, "_")
    }/${this.props.gallery.name
      .replace(/\/?\s+/g, "_")
      .replace(/[^\w\s]/gi, "")}/thumb.jpg?${Date.now()}`
    // imageHash: Date.now()
  };

  render() {
    return (
      <div className="galleryThumb">
        <img
          src={this.state.url}
          //   src={`${this.state.url}?${this.state.imageHash}`}
          alt={
            this.props.gallery.photos &&
            this.props.gallery.photos[0] &&
            this.props.gallery.photos[0].caption
              ? this.props.gallery.photos[0].caption
              : null
          }
          className="gridImage"
        />
        <input
          type="button"
          value="Change Thumbnail"
          className="changeThumbButton"
          onClick={() => this.props.setEditGalleryThumb(this.props.gallery)}
        ></input>
      </div>
    );
  }
}

export default GalleryThumbnail;
