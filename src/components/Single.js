/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";

class Single extends Component {
  // setHeight = () => {
  //   let gallery = document.getElementsByClassName("image-wrapper");
  //   gallery.getAttribute("height") >= gallery.getAttribute("width")
  //     ? document
  //         .getElementsByClassName("gallery")
  //         .setAttribute("style={{ top: '16.66vh' }}")
  //     : document
  //         .getElementsByClassName("gallery")
  //         .setAttribute("style={{ top: '16.66vh' }}");
  // };

  // componentDidMount() {
  //   this.setHeight();
  // }
  render() {
    return (
      <div className="gallery center">
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
                <span>
                  <img
                    src={require("../assets/images/prev-arrow.svg")}
                    alt="previous"
                    className="index-arrow"
                  />
                </span>{" "}
                {this.props.photoIndex} of {this.props.galleryLength}{" "}
                <span>
                  <img
                    src={require("../assets/images/next-arrow.svg")}
                    alt="next"
                    className="index-arrow"
                  />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Single;
