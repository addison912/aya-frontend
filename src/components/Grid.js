import React, { Component } from "react";
import CategoryGrid from "../components/CategoryGrid";
import GalleryGrid from "../components/GalleryGrid";
import { Router } from "@reach/router";

class Grid extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      // <Router className="gallery">
      <div className="gallery">
        {this.props.view == "category" ? (
          <CategoryGrid
            // path="/"
            galleries={this.props.galleries}
            galleryClick={this.props.galleryClick}
          />
        ) : (
          <GalleryGrid
            // path={
            //   this.props.gallery && this.props.gallery.name
            //     ? `/${this.props.gallery.name.replace(/\/?\s+/g, "-")}`
            //     : "/*"
            // }
            // path="/:galleryName"
            gallery={this.props.gallery}
            photoClick={this.props.photoClick}
            category={this.props.category}
          />
        )}
        {/* </Router>  */}
      </div>
    );
  }
}

export default Grid;
