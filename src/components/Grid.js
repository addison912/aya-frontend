import React, { Component } from "react";
import CategoryGrid from "../components/CategoryGrid";
import GalleryGrid from "../components/GalleryGrid";
import { Router } from "@reach/router";

class Grid extends Component {
  componentDidMount() {
    console.log("Grid props:", this.props);
    if (this.props.galleryName) {
      console.log("view:", this.props.view);
    }
  }
  render() {
    return (
      // <Router className="gallery">
      <div className="gallery">
        {this.props.view == "category" ? (
          <CategoryGrid
            path="/"
            galleries={this.props.galleries}
            galleryClick={this.props.galleryClick}
          />
        ) : (
          <GalleryGrid
            path={
              this.props.gallery && this.props.gallery.name
                ? `${this.props.gallery.name
                    .toLowerCase()
                    .replace(/\/?\s+/g, "-")}`
                : null
            }
            // path="/:galleryName"
            gallery={this.props.gallery}
            photoClick={this.props.photoClick}
            category={this.props.category}
          />
        )}
      </div>
      // </Router>
    );
  }
}

export default Grid;
