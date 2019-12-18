/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import CategoryGrid from "../components/CategoryGrid";
import GalleryGrid from "../components/GalleryGrid";

class Grid extends Component {
  render() {
    return (
      <div className="gallery">
        {this.props.view == "category" ? (
          <CategoryGrid
            galleries={this.props.galleries}
            galleryClick={this.props.galleryClick}
          />
        ) : (
          <GalleryGrid
            gallery={this.props.gallery}
            photoClick={this.props.photoClick}
          />
        )}
      </div>
    );
  }
}

export default Grid;
