/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import Single from "../components/Single";
import Grid from "../components/Grid";
import Search from "../components/Search";

class Gallery extends Component {
  componentDidMount() {
    this.props.getGalleries();
  }

  render() {
    return (
      <div>
        <Search id="search" />
        {this.props.layout == "single" && this.props.view == "gallery" ? (
          <Single
            photo={this.props.photo}
            clickPicture={this.props.clickPicture}
            category={this.props.category}
            galleryLength={this.props.galleryLength}
            galleryIndex={this.props.galleryIndex}
          />
        ) : (
          <Grid
            galleries={this.props.galleries}
            category={this.props.category}
            view={this.props.view}
            galleryClick={this.props.galleryClick}
          />
        )}
      </div>
    );
  }
}

export default Gallery;
