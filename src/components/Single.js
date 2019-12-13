/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";

class Single extends Component {
  render() {
    return (
      <div className="gallery row-12">
        <div className="image-container">
          <div
            className="left-overlay"
            style={{
              cursor: `url("${domain}/assets/prev-arrow.svg"), w-resize`
            }}
            onClick={this.props.clickPicture}
            role="button"
            id="prev-photo"
          ></div>
          <div
            className="right-overlay"
            style={{
              cursor: `url("${domain}/assets/next-arrow.svg"), w-resize`
            }}
            onClick={this.props.clickPicture}
            role="button"
            id="next-photo"
          ></div>
          <div className="image-wrapper">
            <img
              className="single-pic"
              key={this.props.photo.url}
              src={this.props.photo.url}
              alt={
                this.props.photo.caption
                  ? this.props.photo.caption
                  : this.props.photo.gallery
              }
            />
            <div className="image-info">
              <p className="caption">{this.props.photo.caption}</p>
              <p className="index">
                {this.props.galleryIndex} of {this.props.galleryLength}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Single;
