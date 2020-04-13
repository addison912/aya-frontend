import React, { Component } from "react";
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
            category={this.props.category}
          />
        )}
      </div>
    );
  }
}

export default Grid;
