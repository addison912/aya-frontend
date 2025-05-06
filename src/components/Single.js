import React, { Component } from "react";
import { Swipeable } from "react-swipeable";
import { convertToWebp } from "../utils/helpers";

class Single extends Component {
  state = {
    imageLoaded: false,
    lastImageUrl: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Reset imageLoaded if the image URL changes
    if (nextProps.photo.url !== prevState.lastImageUrl) {
      return { imageLoaded: false, lastImageUrl: nextProps.photo.url };
    }
    return null;
  }

  initializeCursor = () => {
    let currentCursorPos;
    let cursorEl = document.querySelector("#cursor");
    let cursorImageEl = document.querySelector("#cursor > img");

    window.addEventListener("mousemove", (event) => {
      currentCursorPos = {
        x: event.clientX,
        y: event.clientY,
      };
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
        cursorImageEl.classList.remove("rotate-right", "rotate-left");
        cursorImageEl.classList.add("rotate-left");
      } else if (document.querySelector(".right-overlay>div:hover")) {
        cursorImageEl.classList.remove("rotate-right", "rotate-left");
        cursorImageEl.classList.add("rotate-right");
      } else {
        cursorImageEl.classList.remove("rotate-right", "rotate-left");
      }
    });
  };
  wait = () => {
    let caption = document.querySelector(".image-info");
    if (caption) {
      caption.style.opacity = 0;
      setTimeout(function () {
        caption.style.opacity = 1;
      }, 100);
    }
  };

  componentDidMount() {
    this.initializeCursor();
  }
  render() {
    return (
      <div className="gallery center">
        <Swipeable
          className="image-container"
          onSwiped={(e) => {
            this.props.clickPicture(e.dir);
          }}
        >
          <div className="left-overlay no-highlight">
            <div
              onClick={() => this.props.clickPicture("prev")}
              role="button"
            ></div>
          </div>
          <div className="right-overlay no-highlight">
            <div
              onClick={() => this.props.clickPicture("next")}
              role="button"
            ></div>
          </div>
          <figure className="image-wrapper">
            {this.props.photo.url ? (
              <img
                className="single-pic"
                key={this.props.photo.url}
                src={convertToWebp(this.props.photo.url)}
                alt={
                  this.props.photo.caption
                    ? this.props.photo.caption
                    : this.props.photo.gallery
                }
                style={{
                  opacity: this.state.imageLoaded ? 1 : 0,
                  transition: "opacity 0.1s ease",
                  display: "block",
                }}
                width={
                  this.props.photo.width ? this.props.photo.width : undefined
                }
                height={
                  this.props.photo.height ? this.props.photo.height : undefined
                }
                onLoad={() => this.setState({ imageLoaded: true })}
              />
            ) : null}

            {/* Pre-render previous and next images for prefetching */}
            {this.props.getAdjacentPhoto && this.props.photo.url
              ? (() => {
                  const prev = this.props.getAdjacentPhoto(-1);
                  const next = this.props.getAdjacentPhoto(1);
                  return (
                    <>
                      {prev && prev.url && (
                        <img
                          className="single-pic preload-adjacent"
                          src={convertToWebp(prev.url)}
                          alt=""
                          style={{ display: "none" }}
                          width={prev.width ? prev.width : undefined}
                          height={prev.height ? prev.height : undefined}
                        />
                      )}
                      {next && next.url && (
                        <img
                          className="single-pic preload-adjacent"
                          src={convertToWebp(next.url)}
                          alt=""
                          style={{ display: "none" }}
                          width={next.width ? next.width : undefined}
                          height={next.height ? next.height : undefined}
                        />
                      )}
                    </>
                  );
                })()
              : null}

            {this.props.photo.url &&
            this.props.photo.caption &&
            this.state.imageLoaded ? (
              <div className="image-info" onChange={this.wait()}>
                <p className="caption">{this.props.photo.caption}</p>
                <p className="caption-nav">
                  <span onClick={() => this.props.clickPicture("prev")}>
                    <img
                      src={require("../assets/images/prev-arrow.svg")}
                      alt="previous"
                      className="index-arrow"
                    />
                  </span>{" "}
                  {this.props.galleryLength ? (
                    <span>
                      {this.props.photoIndex + 1} of {this.props.galleryLength}{" "}
                    </span>
                  ) : null}
                  {this.props.galleryLength ? (
                    <span onClick={() => this.props.clickPicture("next")}>
                      <img
                        src={require("../assets/images/next-arrow.svg")}
                        alt="next"
                        className="index-arrow"
                      />
                    </span>
                  ) : null}
                </p>
              </div>
            ) : null}
          </figure>
        </Swipeable>
      </div>
    );
  }
}

export default Single;
