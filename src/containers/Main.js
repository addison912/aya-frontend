/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import Gallery from "../components/Gallery";
import { Router } from "@reach/router";
import { categories } from "../config/constants";
import Single from "../components/Single";
import Grid from "../components/Grid";

class Main extends Component {
  componentDidMount() {
    if (!!this.props.galleryName && this.props.galleries) {
      console.log(this.props.galleryName);
      this.props.categoryChangeHandler(
        this.props.category,
        this.props.galleryName
      );
    } else if (this.props.path && this.props.path.indexOf("Search/") > -1) {
      if (this.props.query) {
        console.log(`searching for "${this.props.query}"`);
        this.props.searchQuery(this.props.query);
      }
    } else if (this.props.category) {
      this.props.categoryChangeHandler(this.props.category);
    } else if (!this.props.category) {
      this.props.categoryChangeHandler("Home");
    }
    // console.log(this.props);
    this.props.setLocation("Main");
    console.log(this.props);
  }
  render() {
    return (
      // <Gallery
      //   path="/"
      //   photo={this.props.photo}
      //   clickPicture={this.props.clickPicture}
      //   category={this.props.cat || this.props.category}
      //   galleries={this.props.galleries} // don't forget to remove this
      //   getGalleries={this.props.getGalleries}
      //   layout={this.props.layout}
      //   view={this.props.view}
      //   galleryLength={this.props.galleryLength}
      //   photoIndex={(this.props.photoIndex % this.props.galleryLength) + 1}
      //   galleryClick={this.props.galleryClick}
      //   gallery={this.props.gallery}
      //   photoClick={this.props.photoClick}
      //   toggleGalleryLayout={this.props.toggleGalleryLayout}
      // />
      <div className="main">
        <div className="content">
          <div className={"gallery-container"}>
            {this.props.layout == "single" && this.props.view == "gallery" ? (
              <Single
                path="/photo"
                photo={this.props.photo}
                clickPicture={this.props.clickPicture}
                category={this.props.category}
                galleryLength={this.props.galleryLength}
                photoIndex={this.props.photoIndex}
              />
            ) : (
              <Grid
                path={`/`}
                // path={
                //   this.props.category &&
                //   this.prop.category &&
                //   this.props.gallery &&
                //   this.props.gallery.name != "Home"
                //     ? "/"
                //     : "/"
                // }
                galleries={this.props.galleries}
                category={this.props.category}
                view={this.props.view}
                galleryClick={this.props.galleryClick}
                gallery={this.props.gallery}
                photoClick={this.props.photoClick}
                galleryName={this.props.galleryName}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
