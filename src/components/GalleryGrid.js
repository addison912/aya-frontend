/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { parsePhotoUrl } from "../utils/helpers";
import { convertToWebp } from "../utils/helpers";

class GalleryGrid extends Component {
  // componentDidMount() {
  //   // console.log("gallery grid mounted");
  //   // console.log(this.props);
  // }
  render() {
    return (
      <div className="gallery-content">
        {this.props.gallery && this.props.gallery.photos
          ? this.props.gallery.photos.map((photo, i) => (
              <figure
                className={
                  this.props.category == "Books"
                    ? "grid-image gallery-image book-image"
                    : "grid-image gallery-image"
                }
                key={photo.location}
                data={i}
                role="button"
                loading="lazy"
                onClick={this.props.photoClick}
                style={
                  photo.order
                    ? { order: photo.order }
                    : { order: this.props.gallery.photos.length + i }
                }
              >
                <img
                  src={`${parsePhotoUrl(photo)}/thumbs/${convertToWebp(photo.location)}`}
                  alt={photo.caption}
                  className="gridImage"
                />
              </figure>
            ))
          : null}
      </div>
    );
  }
}

export default GalleryGrid;
