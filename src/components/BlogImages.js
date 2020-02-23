/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { navigate } from "@reach/router";

class BlogImages extends Component {
  handleClick = e => {
    if (e) {
      navigate(e);
    }
  };
  render() {
    return (
      <div className="post-images">
        {this.props.photos.map((photo, i) => {
          // if (!photo.link) {
          return (
            <figure
              key={i}
              className="grid-image"
              style={photo.order ? { order: photo.order } : { order: i }}
              onClick={() => this.handleClick(photo.link)}
            >
              <img
                src={photo.location}
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
