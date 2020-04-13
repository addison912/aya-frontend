/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import Gallery from "../components/Gallery";

class Main extends Component {
  componentDidMount() {
    if (this.props.path && this.props.path.indexOf("/Search/") > -1) {
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
    // axios.get(`${domain}/api/fail`);
    // this.props.toggleGalleryLayout("grid");
  }
  render() {
    return (
      <div className="main">
        <div className="content">
          <Gallery
            photo={this.props.photo}
            clickPicture={this.props.clickPicture}
            category={this.props.cat || this.props.category}
            galleries={this.props.galleries} // don't forget to remove this
            getGalleries={this.props.getGalleries}
            layout={this.props.layout}
            view={this.props.view}
            galleryLength={this.props.galleryLength}
            photoIndex={(this.props.photoIndex % this.props.galleryLength) + 1}
            galleryClick={this.props.galleryClick}
            gallery={this.props.gallery}
            photoClick={this.props.photoClick}
            toggleGalleryLayout={this.props.toggleGalleryLayout}
          />
        </div>
      </div>
    );
  }
}

export default Main;
