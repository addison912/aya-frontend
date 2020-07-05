/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { domain } from "../config/constants";
import { navigate } from "@reach/router";

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
              onClick={
                photo.caption ? () => navigate("http://www.google.com") : null
              }
            >
              <img
                src={`${domain}/uploads/news/${photo.location}`}
                alt={photo.caption ? photo.caption : `blog photo ${i}`}
              />
              {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
            </figure>
          );
        })}
      </div>
    );
  }
}

export default BlogImages;
