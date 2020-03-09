/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import { useSwipeable, Swipeable } from "react-swipeable";

class Single extends Component {
  initializeCursor = () => {
    let currentCursorPos;
    let cursorEl = document.querySelector("#cursor");
    let cursorImageEl = document.querySelector("#cursor > img");

    window.addEventListener("mousemove", event => {
      currentCursorPos = { x: event.clientX, y: event.clientY };
      if (
        document.querySelector(".image-container>div>div:hover") &&
        window.innerWidth > 560
      ) {
        cursorEl.style.display = "inline-block";
        cursorImageEl.style.opacity = "1";
      } else if (document.querySelector(".image-container>div:hover")) {
        cursorEl.style.display = "inline-block";
        cursorImageEl.style.opacity = "0";
      }
      if (document.querySelector(".image-container:hover")) {
        cursorEl.style.transform = `translate(${currentCursorPos.x}px, ${currentCursorPos.y}px)`;
      } else if (!document.querySelector(".image-container:hover")) {
        cursorEl.style.display = "none";
      }
      if (document.querySelector(".left-overlay>div:hover")) {
        cursorImageEl.style.transform = `rotate(-90deg)`;
      } else if (document.querySelector(".right-overlay>div:hover")) {
        cursorImageEl.style.transform = `rotate(90deg)`;
      } else {
        cursorImageEl.style.transform = `rotate(0deg)`;
      }
    });
  };

  componentDidMount() {
    this.initializeCursor();
  }
  render() {
    return (
      <div className="gallery center">
        <div id="cursor">
          <img alt="Cursor Arrow" src={`${domain}/assets/up-arrow.svg`} />
        </div>
        <Swipeable
          className="image-container"
          onSwiped={e => {
            this.props.clickPicture(e.dir);
          }}
        >
          <div className="left-overlay">
            <div
              onClick={() => this.props.clickPicture("prev")}
              role="button"
            ></div>
          </div>
          <div className="right-overlay">
            <div
              onClick={() => this.props.clickPicture("next")}
              role="button"
            ></div>
          </div>
          <figure className="image-wrapper">
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
              <p className="caption">
                {this.props.photo.caption ? this.props.photo.caption : null}
              </p>
              <p className="caption-nav">
                <span onClick={() => this.props.clickPicture("prev")}>
                  <img
                    src={require("../assets/images/prev-arrow.svg")}
                    alt="previous"
                    className="index-arrow"
                  />
                </span>{" "}
                {this.props.photoIndex && this.props.galleryLength ? (
                  <span>
                    {this.props.photoIndex} of {this.props.galleryLength}{" "}
                  </span>
                ) : null}
                <span onClick={() => this.props.clickPicture("next")}>
                  <img
                    src={require("../assets/images/next-arrow.svg")}
                    alt="next"
                    className="index-arrow"
                  />
                </span>
              </p>
            </div>
          </figure>
        </Swipeable>
      </div>
    );
  }
}

export default Single;
