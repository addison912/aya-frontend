/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";

class Gallery extends Component {
  componentDidMount() {
    this.getImages();
    this.props.getGalleries("Home");
  }

  getImages = () => {
    fetch(`${domain}/api/test`)
      .then(res => {
        return res.json();
      })
      .then(text => {
        console.log(text);
        this.setState({ message: text.message });
      });
  };

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
          <img
            key={this.props.pictureUrl}
            src={this.props.pictureUrl}
            alt="corgi"
          />
        </div>
      </div>
    );
  }
}

export default Gallery;
