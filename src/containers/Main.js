import React, { Component } from "react";
import LeftNav from "../components/LeftNav";
import { domain } from "../config/constants";
import { Router, navigate, Link } from "@reach/router";
import About from "./About";
import Gallery from "../components/Gallery";

class Main extends Component {
  state = {
    photo: {},
    message: "",
    category: "Home",
    gallery: {},
    galleries: [],
    layout: "single",
    view: "gallery",
    caption: "",
    pictureUrl: require("../assets/images/spinner.gif"),
    photoIndex: 0,
    galleryIndex: 0,
    galleryLength: 0
  };

  toggleGalleryLayout = e => {
    this.setState({ layout: e.target.getAttribute("layout-data") });
  };

  categoryClickHandler = e => {
    this.setState({ category: e.target.getAttribute("data") });
    this.getGalleries(e.target.getAttribute("data"));
    if (document.querySelector(".category-link-selected")) {
      document
        .querySelector(".category-link-selected")
        .classList.remove("category-link-selected");
    }
    e.target.classList.add("category-link-selected");
    // console.log(e.target.getAttribute("data"));
  };

  getGalleries = category => {
    this.setState({ category });
    fetch(`${domain}/api/gallery/c/${category || "Home"}`)
      .then(res => {
        return res.json();
      })
      .then(galleries => {
        this.setState({
          galleries,
          photoIndex: 0,
          gallery: galleries[0],
          galleryIndex: 0
        });
        if (galleries.length > 1) {
          this.setState({ view: "category" });
        } else if (galleries.length == 1) {
          this.setState({ view: "gallery" });
        }
        this.setPictureUrl();
        // console.log(this.state.galleries);
      });
  };

  setGallery = i => {
    let gallery = this.state.galleries[i];
    this.setState({ gallery });
  };

  clickPicture = e => {
    let newIndex = this.state.photoIndex;
    if (e.target.getAttribute("id") == "next-photo") {
      newIndex++;
    } else if (e.target.getAttribute("id") == "prev-photo") {
      newIndex--;
    }
    if (newIndex <= -1) {
      newIndex = this.state.gallery.photos.length - 1;
    }
    this.setState({ photoIndex: newIndex });
    this.setPictureUrl(newIndex);
  };

  galleryClick = e => {
    let i = e.target.closest(".gridImageWrapper").getAttribute("data");
    let gallery = this.state.galleries[i];
    this.setState({ gallery, view: "gallery" });
    let photo = gallery.photos[0];
    let url =
      domain +
      "/uploads/" +
      gallery.category.replace(/\/?\s+/g, "_") +
      "/" +
      gallery.name.replace(/\/?\s+/g, "_") +
      "/" +
      gallery.photos[0].location;
    photo.url = url;
    this.setState({ photo, photoIndex: 0 });
    this.setGalleryLength();
    this.setGallery(i);
  };

  photoClick = e => {
    let i = e.target.closest(".gridImageWrapper").getAttribute("data");
    this.setState({ layout: "single", photoIndex: i });
    this.setPictureUrl(i);
    this.setGalleryLength();
  };

  setPictureUrl = i => {
    let index = i ? i : this.state.photoIndex;
    index = index % this.state.gallery.photos.length;
    let photo = this.state.gallery.photos[index];
    let url =
      domain +
      "/uploads/" +
      this.state.gallery.category.replace(/\/?\s+/g, "_") +
      "/" +
      this.state.gallery.name.replace(/\/?\s+/g, "_") +
      "/" +
      this.state.gallery.photos[index].location;
    photo.url = url;
    this.setState({ photo });
    // console.log(photo);
    this.setGalleryLength();
  };

  setGalleryLength = () => {
    this.setState({ galleryLength: this.state.gallery.photos.length });
  };

  render() {
    return (
      <div className="main">
        <LeftNav
          toggleGalleryLayout={this.toggleGalleryLayout}
          categoryClickHandler={this.categoryClickHandler}
          layout={this.state.layout}
        />
        <div>
          <div />
          <Router>
            <Gallery
              photo={this.state.photo}
              clickPicture={this.clickPicture}
              category={this.state.category}
              galleries={this.state.galleries} // don't forget to remove this
              getGalleries={this.getGalleries}
              layout={this.state.layout}
              view={this.state.view}
              path={"/*"}
              galleryLength={this.state.galleryLength}
              photoIndex={(this.state.photoIndex % 42) + 1}
              galleryClick={this.galleryClick}
              gallery={this.state.gallery}
              photoClick={this.photoClick}
            />

            {/* <Gallery path={"/:gallery"} /> */}
            <About path="about" />
          </Router>
        </div>
      </div>
    );
  }
}

export default Main;
