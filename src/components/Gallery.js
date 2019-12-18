/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import Single from "../components/Single";
import Grid from "../components/Grid";

class Gallery extends Component {
  componentDidMount() {
    this.props.getGalleries();
  }

  render() {
    return (
      <div className={"gallery-container"}>
        {this.props.layout == "single" && this.props.view == "gallery" ? (
          <Single
            photo={this.props.photo}
            clickPicture={this.props.clickPicture}
            category={this.props.category}
            galleryLength={this.props.galleryLength}
            photoIndex={this.props.photoIndex}
          />
        ) : (
          <Grid
            galleries={this.props.galleries}
            category={this.props.category}
            view={this.props.view}
            galleryClick={this.props.galleryClick}
            gallery={this.props.gallery}
            photoClick={this.props.photoClick}
          />
        )}
      </div>
    );
  }
}

export default Gallery;
