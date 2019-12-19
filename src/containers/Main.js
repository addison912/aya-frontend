import React, { Component } from "react";
import { domain } from "../config/constants";
import { Router, navigate, Link } from "@reach/router";
import Gallery from "../components/Gallery";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";
import Search from "../components/Search";
import LayoutIcons from "../components/LayoutIcons";

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
          galleryIndex: 0
        });

        if (galleries.length > 1) {
          this.setState({ view: "category" });
        } else if (galleries.length == 1) {
          this.setState({
            view: "gallery",
            galleryLength: galleries[0].photos.length,
            gallery: galleries[0]
          });
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
      newIndex = this.state.galleryLength - 1;
    }
    this.setState({ photoIndex: newIndex });
    this.setPictureUrl(newIndex);
    console.log("new: " + this.state.photoIndex);
    console.log("state" + this.state.photoIndex);
  };

  galleryClick = e => {
    let i = e.target.closest(".gridImageWrapper").getAttribute("data");
    let gallery = this.state.galleries[i];
    this.setState({ gallery, view: "gallery" });
    let photo = gallery.photos[0];
    let url =
      domain +
      "/uploads/photos/" +
      gallery.category.replace(/\/?\s+/g, "_") +
      "/" +
      gallery.name.replace(/\/?\s+/g, "_") +
      "/" +
      gallery.photos[0].location;
    photo.url = url;
    this.setState({ photo, photoIndex: 0 });
    this.setGallery(i);
    this.setState({ galleryLength: this.state.galleries[i].photos.length });
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
      "/uploads/photos/" +
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
        <Logo className="logo" />
        <LeftNav categoryClickHandler={this.categoryClickHandler} />
        <Search id="search" />
        <LayoutIcons
          layout={this.state.layout}
          toggleGalleryLayout={this.toggleGalleryLayout}
        />
        <div className="content">
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
            photoIndex={(this.state.photoIndex % this.state.galleryLength) + 1}
            galleryClick={this.galleryClick}
            gallery={this.state.gallery}
            photoClick={this.photoClick}
          />

          {/* <Gallery path={"/:gallery"} /> */}
        </div>
      </div>
    );
  }
}

export default Main;
