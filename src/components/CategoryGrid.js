/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import ImageSpacer from "./ImageSpacer";
import { Link } from "@reach/router";

class CategoryGrid extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="gallery-content">
        {this.props.galleries.map((gallery, i) => (
          // <Link to={gallery.name.replace(/\/?\s+/g, "-")} key={i}>
          <figure
            key={i}
            className="grid-image category-image"
            data={i}
            onClick={this.props.galleryClick}
            role="button"
            style={{
              order: gallery.order ? gallery.order : this.props.galleries.length
            }}
          >
            <img
              src={`${domain}/uploads/photos/${gallery.category.replace(
                /\/?\s+/g,
                "_"
              )}/${gallery.name
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
          /* </Link> */
        ))}
        <ImageSpacer />
        <ImageSpacer />
      </div>
    );
  }
}

export default CategoryGrid;
