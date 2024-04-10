/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { Router } from "@reach/router";
import Single from "../components/Single";
import Grid from "../components/Grid";

class Main extends Component {
  componentDidMount() {
    if (!!this.props.galleryName && this.props.galleries) {
      // console.log(this.props.galleryName);
      this.props.categoryChangeHandler(
        this.props.category,
        this.props.galleryName,
      );
    } else if (this.props.path && this.props.path.indexOf("Search/") > -1) {
      if (this.props.query) {
        // console.log(`searching for "${this.props.query}"`);
        this.props.searchQuery(this.props.query);
      }
    } else if (this.props.category) {
      this.props.categoryChangeHandler(this.props.category);
    } else if (!this.props.category) {
      this.props.categoryChangeHandler("Home");
    }
    // console.log(this.props);
    this.props.setLocation("Main");
    this.props.clearSearch();
    // console.log(this.props);
  }
  render() {
    return (
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
