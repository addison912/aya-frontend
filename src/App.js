import React from "react";
import { createHistory, LocationProvider, Router } from "@reach/router";
// import mainContext from "./mainContext";
import { categories } from "./config/constants";
import { createHashSource } from "reach-router-hash-history";
import Logo from "./components/Logo";
import Search from "./components/Search";
import TopNav from "./components/TopNav";

const history = createHistory(createHashSource());

import Main from "./containers/Main";
import About from "./containers/About";
import News from "./containers/News";
import Shop from "./containers/Shop";
import { domain } from "./config/constants";
import Navbar from "./components/Navbar";
import MobileInfo from "./components/MobileInfo";
import LeftNav from "./components/LeftNav";
import Test from "./containers/Test";

class App extends React.Component {
  state = {
    photo: {},
    message: "",
    category: "",
    gallery: {},
    galleries: [],
    layout: "single",
    view: "gallery",
    pictureUrl: require("./assets/images/spinner.gif"),
    photoIndex: 0,
    galleryIndex: 0,
    galleryLength: 0,
    searchInput: "",
    hamburgerMenu: false,
    mobileInfo: false,
    location: ""
  };

  toggleGalleryLayout = layout => {
    this.setState({
      layout,
      mobileInfo: false
    });
  };

  setGallery = i => {
    let gallery = this.state.galleries[i];
    this.setState({ gallery });
  };

  setGalleryLength = () => {
    this.setState({ galleryLength: this.state.gallery.photos.length });
  };

  galleryClick = e => {
    let i = e.target.closest("figure").getAttribute("data");
    let gallery = this.state.galleries[i];
    this.setState({ gallery, view: "gallery" });
    let photo = gallery.photos[0];
    let url =
      domain +
      "/uploads/photos/" +
      gallery.category.replace(/\/?\s+/g, "_") +
      "/" +
      gallery.name.replace(/\/?\s+/g, "_").replace(/[^\w\s]/gi, "") +
      "/" +
      gallery.photos[0].location;
    photo.url = url;
    this.setState({ photo, photoIndex: 0 });
    this.setGallery(i);
    this.setState({ galleryLength: this.state.galleries[i].photos.length });
  };

  categoryChangeHandler = category => {
    this.setState({
      category,
      gallery: {},
      galleries: [],
      photoIndex: 0,
      galleryIndex: 0,
      galleryLength: 0
    });
    this.getGalleries(category);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    this.setState({ hamburgerMenu: false, mobileInfo: false, layout: "grid" });
  };

  handleLogoClick = () => {
    this.categoryChangeHandler("Home");
    this.setState({ layout: "grid" });
    if (document.querySelector(".category-link-selected")) {
      document
        .querySelector(".category-link-selected")
        .classList.remove("category-link-selected");
    }
  };

  getGalleries = category => {
    this.setState({ category });
    fetch(`${domain}/api/gallery/c/${category.replace(/[^\w\s]/gi, " ")}`)
      .then(res => {
        return res.json();
      })
      .then(galleries => {
        let photoIndex =
          category.toLowerCase() == "home"
            ? Math.floor(Math.random() * galleries[0].photos.length)
            : 0;
        // galleries.sort(function(a, b) {
        //   return a.order - b.order;
        // });
        galleries.forEach(gallery => {
          gallery.photos.sort(function(a, b) {
            return a.order - b.order;
          });
        });
        this.setState({
          galleries,
          photoIndex,
          galleryIndex: 0
        });

        if (galleries.length > 1) {
          this.setState({ view: "category" });
        } else if (galleries.length == 1) {
          let gallery = galleries[0];
          this.setState({
            view: "gallery",
            galleryLength: gallery.photos.length,
            layout: "grid",
            gallery
          });
          this.setPictureUrl();
        }
      });
  };

  //search

  search = e => {
    e.preventDefault(this.state.searchInput);
    if (this.state.searchInput.length > 0) {
      if (this.state.hamburgerMenu == true) {
        this.setState({ hamburgerMenu: false });
      }
      if (document.querySelector(".category-link-selected")) {
        document
          .querySelector(".category-link-selected")
          .classList.remove("category-link-selected");
      }
      this.setState({ category: "" });
      fetch(`${domain}/api/photo/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: this.state.searchInput })
      })
        .then(res => {
          return res.json();
        })
        .then(photos => {
          this.setState({
            view: "gallery",
            layout: "grid",
            galleries: [{ photos }],
            photoIndex: 0,
            galleryIndex: 0,
            gallery: { photos },
            galleryLength: photos.length,
            searchInput: ""
          });
        });
    } else {
      document.querySelector(".main .search").focus();
    }
  };

  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  //////
  clickPicture = dir => {
    document.querySelector(".single-pic").classList.add("fade-out");
    let newIndex = this.state.photoIndex;
    if (dir == "next" || dir == "Left") {
      newIndex++;
    } else if (dir == "prev" || dir == "Right") {
      newIndex--;
    }
    if (newIndex <= -1) {
      newIndex = this.state.galleryLength - 1;
    }
    setTimeout(() => {
      this.setState({ photoIndex: newIndex });
      this.setPictureUrl(newIndex);
    }, 500);
  };

  /////
  photoClick = e => {
    let i = e.target.closest("figure").getAttribute("data");
    this.setState({ layout: "single", photoIndex: i });
    this.setPictureUrl(i);
    this.setGalleryLength();
  };

  setPictureUrl = i => {
    let index = i ? i : this.state.photoIndex;
    // index = index == 0 ? 1 : index;
    index = index % this.state.gallery.photos.length;
    let photo = this.state.gallery.photos[index];
    let url =
      domain +
      "/uploads/photos/" +
      photo.category.replace(/\/?\s+/g, "_") +
      "/" +
      photo.gallery.replace(/\/?\s+/g, "_") +
      "/" +
      photo.location;
    photo.url = url;
    this.setState({ photo });
    // console.log(photo);
    this.setGalleryLength();
  };

  setLocation = location => {
    this.setState({ location });
  };

  toggleHamburgerMenu = () => {
    this.setState({ hamburgerMenu: !this.state.hamburgerMenu });
    this.setState({ mobileInfo: false });
  };

  toggleMobileInfo = () => {
    this.setState({ mobileInfo: !this.state.mobileInfo });
    this.setState({ hamburgerMenu: false });
  };

  componentDidMount() {
    //hide hamburger menu when background clicked
    window.addEventListener("click", e => {
      if (this.state.hamburgerMenu == true) {
        if (
          !e.target.closest("#navbar") &&
          !e.target.closest(".hamburger-menu")
        ) {
          this.toggleHamburgerMenu();
        }
      }
    });
  }

  render() {
    return (
      <LocationProvider history={history}>
        <Router
          path="/"
          className={
            this.state.hamburgerMenu || this.state.mobileInfo
              ? "router background-blur"
              : "router unblur"
          }
        >
          {categories.map(category => (
            <Main
              key={category}
              path={`/${category.replace(/\/?\s+/g, "-")}`}
              categoryChangeHandler={this.categoryChangeHandler}
              search={this.search}
              searchInput={this.state.searchInput}
              handleSearchInput={this.handleSearchInput}
              layout={this.state.layout}
              toggleGalleryLayout={this.toggleGalleryLayout}
              photo={this.state.photo}
              clickPicture={this.clickPicture}
              category={category}
              galleries={this.state.galleries} // don't forget to remove this
              getGalleries={this.getGalleries}
              view={this.state.view}
              galleryLength={this.state.galleryLength}
              photoIndex={this.state.photoIndex % this.state.galleryLength}
              galleryClick={this.galleryClick}
              gallery={this.state.gallery}
              photoClick={this.photoClick}
              handleLogoClick={this.handleLogoClick}
              setLocation={this.setLocation}
            />
          ))}
          <About
            path="/about"
            categoryChangeHandler={this.categoryChangeHandler}
            handleLogoClick={this.handleLogoClick}
            setLocation={this.setLocation}
          />
          <News
            path="/news"
            categoryChangeHandler={this.categoryChangeHandler}
            handleLogoClick={this.handleLogoClick}
            setLocation={this.setLocation}
          />
          <Shop
            path="/shop"
            categoryChangeHandler={this.categoryChangeHandler}
            handleLogoClick={this.handleLogoClick}
            setLocation={this.setLocation}
          />
          <Main
            path="/"
            categoryChangeHandler={this.categoryChangeHandler}
            search={this.search}
            searchInput={this.state.searchInput}
            handleSearchInput={this.handleSearchInput}
            layout={this.state.layout}
            toggleGalleryLayout={this.toggleGalleryLayout}
            photo={this.state.photo}
            clickPicture={this.clickPicture}
            category={this.state.category}
            galleries={this.state.galleries} // don't forget to remove this
            getGalleries={this.getGalleries}
            view={this.state.view}
            galleryLength={this.state.galleryLength}
            photoIndex={this.state.photoIndex % this.state.galleryLength}
            galleryClick={this.galleryClick}
            gallery={this.state.gallery}
            photoClick={this.photoClick}
            handleLogoClick={this.handleLogoClick}
            setLocation={this.setLocation}
          />
          <Test
            path="/Test"
            categoryChangeHandler={this.categoryChangeHandler}
            handleLogoClick={this.handleLogoClick}
          ></Test>
        </Router>
        <Logo className="logo" handleLogoClick={this.handleLogoClick} />
        <Navbar
          category={this.state.category}
          layout={this.state.layout}
          view={this.state.view}
          toggleGalleryLayout={this.toggleGalleryLayout}
          categoryChangeHandler={this.categoryChangeHandler}
          toggleHamburgerMenu={this.toggleHamburgerMenu}
          hamburgerMenu={this.state.hamburgerMenu}
          search={this.search}
          handleSearchInput={this.handleSearchInput}
          searchInput={this.state.searchInput}
          mobileInfo={this.state.mobileInfo}
          toggleMobileInfo={this.toggleMobileInfo}
          container={this.state.location}
          galleries={this.state.galleries.length}
        />
        <MobileInfo
          mobileInfo={this.state.mobileInfo}
          toggleMobileInfo={this.toggleMobileInfo}
          photo={this.state.photo}
        />
        <LeftNav
          location={this.state.location}
          view={this.state.view}
          category={this.state.category}
          layout={this.state.layout}
          categoryChangeHandler={this.categoryChangeHandler}
          toggleGalleryLayout={this.toggleGalleryLayout}
        />
        {this.state.view == "gallery" && this.state.location == "Main" ? (
          <TopNav
            view={this.state.view}
            galleries={this.state.galleries}
            category={this.state.category}
            categoryChangeHandler={this.categoryChangeHandler}
            layout={this.state.layout}
            toggleGalleryLayout={this.toggleGalleryLayout}
          ></TopNav>
        ) : null}
        {this.state.location == "Main" ? (
          <Search
            className="search-component"
            search={this.search}
            searchInput={this.state.searchInput}
            handleSearchInput={this.handleSearchInput}
          />
        ) : null}
        {this.state.location == "About" ? <div className="spacer"></div> : null}
      </LocationProvider>
    );
  }
}

export default App;
