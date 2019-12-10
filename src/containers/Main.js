import React, { Component } from "react";
import LeftNav from "../components/LeftNav";
import { domain } from "../config/constants";
import { Router, navigate, Link } from "@reach/router";
import About from "./About";
import Gallery from "../components/Gallery";

class Main extends Component {
  state = {
    photo: null,
    message: "",
    category: "Home",
    gallery: "",
    galleries: [],
    layout: "single",
    caption: "",
    pictureUrl: require("../assets/images/spinner.gif"),
    galleryIndex: 0
  };

  toggleGalleryLayout = e => {
    this.setState({ layout: e.target.getAttribute("data") });
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
    console.log(e.target.getAttribute("data"));
  };

  getGalleries = category => {
    this.path;
    fetch(`${domain}/api/gallery/c/${!this.state.category ? "Home" : category}`)
      .then(res => {
        return res.json();
      })
      .then(galleries => {
        this.setState({
          galleries,
          galleryIndex: 0
        });
        this.setPictureUrl();
        console.log(this.state.galleries);
      });
  };

  displaySingleImage;

  clickPicture = e => {
    let newIndex = this.state.galleryIndex;
    if (e.target.getAttribute("id") == "next-photo") {
      newIndex++;
    } else if (e.target.getAttribute("id") == "prev-photo") {
      newIndex--;
    }
    if (newIndex <= -1) {
      newIndex = this.state.galleries[0].photos.length - 1;
    }
    this.setState({ galleryIndex: newIndex });
    this.setPictureUrl(newIndex);
  };

  setPictureUrl = i => {
    let index = i ? i : this.state.galleryIndex;
    index = index % this.state.galleries[0].photos.length;
    let image =
      domain +
      "/uploads/" +
      this.state.galleries[0].category.replace(/\s+/g, "_") +
      "/" +
      this.state.galleries[0].name +
      "/" +
      this.state.galleries[0].photos[index].location; // Math.floor(Math.random() * galleries[0].photos.length)
    this.setState({ pictureUrl: image });
    console.log(image);
  };

  render() {
    return (
      <div className="main">
        <LeftNav
          toggleGalleryLayout={this.toggleGalleryLayout}
          categoryClickHandler={this.categoryClickHandler}
        />
        <Router>
          <Gallery
            pictureUrl={this.state.pictureUrl}
            clickPicture={this.clickPicture}
            getGalleries={this.getGalleries}
            layout={this.state.layout}
            path={"/*"}
            category={this.state.category}
          />
          {/* <Gallery path={"/:gallery"} /> */}
          <About path="about" />
        </Router>
      </div>
    );
  }
}

export default Main;
