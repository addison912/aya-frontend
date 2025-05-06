/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { domain } from "../config/constants";
import { navigate } from "@reach/router";
import { convertToWebp } from "../utils/helpers";

class BlogImages extends Component {
  render() {
    return (
      <div className="post-images">
        {this.props.photos.map((photo, i) => {
          return (
            <figure
              key={i}
              className="grid-image"
              style={photo.order ? { order: photo.order } : { order: i }}
              onClick={photo.link ? () => navigate(photo.link) : null}
            >
              <img
                className={photo.link ? "post-image__clickable" : ""}
                src={`${domain}/uploads/news/${convertToWebp(photo.location)}`}
                alt={photo.caption ? photo.caption : `blog photo ${i}`}
                loading="lazy"
              />
              {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
              {photo.link}
            </figure>
          );
        })}
      </div>
    );
  }
}

export default BlogImages;
