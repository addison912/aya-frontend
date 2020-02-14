import React from "react";
import { Router, navigate, Link } from "@reach/router";

// import Header from "./components/Header";
import Main from "./containers/Main";
import About from "./containers/About";
import News from "./containers/News";
import Shop from "./containers/Shop";
import { domain } from "./config/constants";
import Navbar from "./components/Navbar";
import MobileInfo from "./components/MobileInfo";
// import LeftNav from "./components/LeftNav";

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
    mobileInfo: false
  };

  toggleGalleryLayout = e => {
    this.setState({
      layout: e.target.closest(".icon-wrapper").getAttribute("layout-data")
    });
  };

  setGallery = i => {
    let gallery = this.state.galleries[i];
    this.setState({ gallery });
  };

  setGalleryLength = () => {
    this.setState({ galleryLength: this.state.gallery.photos.length });
  };

  setCategory = category => {
    this.setState({ category });
    this.getGalleries(category);
    this.state.hamburgerMenu == true
      ? this.setState({ hamburgerMenu: false })
      : null;
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
    if (this.state.hamburgerMenu == true) {
      this.setState({ hamburgerMenu: false });
    }
  };

  getGalleries = category => {
    this.setState({ category });

    fetch(`${domain}/api/gallery/c/${category}`)
      .then(res => {
        return res.json();
      })
      .then(galleries => {
        console.log(galleries);
        let photoIndex =
          category.toLowerCase() == "home"
            ? Math.floor(Math.random() * galleries[0].photos.length)
            : 0;
        this.setState({
          galleries,
          photoIndex,
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

  //search

  search = e => {
    e.preventDefault(this.state.searchInput);
    if (this.state.hamburgerMenu == true) {
      this.setState({ hamburgerMenu: false });
    }
    console.log(`searching for: ${this.state.searchInput}`);
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

        if (photos.length > 1) {
          console.log("length: " + photos.length);
        }

        console.log(this.state.gallery);

        // this.setPictureUrl();
        // console.log(this.state.galleries);
      });
  };

  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value });
    // console.log(e.target.value);
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

  componentDidMount() {
    if (this.state.category) {
      this.getGalleries(this.state.category);
    } else this.getGalleries("Home");

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

  toggleHamburgerMenu = () => {
    this.setState({ hamburgerMenu: !this.state.hamburgerMenu });
  };

  toggleMobileInfo = () => {
    console.log("info clicked");
    this.setState({ mobileInfo: !this.state.mobileInfo });
  };

  render() {
    return (
      <React.StrictMode>
        <div className="App">
          <Router
            className={
              this.state.hamburgerMenu || this.state.mobileInfo
                ? "router background-blur"
                : "router"
            }
          >
            <About
              path="/about"
              categoryClickHandler={this.categoryClickHandler}
              setCategory={this.setCategory}
            />
            <News
              path="/news"
              categoryClickHandler={this.categoryClickHandler}
              setCategory={this.setCategory}
            />
            <Shop
              path="/shop"
              categoryClickHandler={this.categoryClickHandler}
              setCategory={this.setCategory}
            />
            <Main
              path="/"
              setCategory={this.setCategory}
              categoryClickHandler={this.categoryClickHandler}
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
              photoIndex={
                (this.state.photoIndex % this.state.galleryLength) + 1
              }
              galleryClick={this.galleryClick}
              gallery={this.state.gallery}
              photoClick={this.photoClick}
            />
            <Main
              path="/:cat"
              setCategory={this.setCategory}
              categoryClickHandler={this.categoryClickHandler}
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
              photoIndex={
                (this.state.photoIndex % this.state.galleryLength) + 1
              }
              galleryClick={this.galleryClick}
              gallery={this.state.gallery}
              photoClick={this.photoClick}
            />
          </Router>
          <Navbar
            layout={this.state.layout}
            view={this.state.view}
            toggleGalleryLayout={this.toggleGalleryLayout}
            categoryClickHandler={this.categoryClickHandler}
            toggleHamburgerMenu={this.toggleHamburgerMenu}
            hamburgerMenu={this.state.hamburgerMenu}
            search={this.search}
            handleSearchInput={this.handleSearchInput}
            searchInput={this.state.searchInput}
            mobileInfo={this.state.mobileInfo}
            toggleMobileInfo={this.toggleMobileInfo}
          />
          <MobileInfo
            mobileInfo={this.state.mobileInfo}
            toggleMobileInfo={this.toggleMobileInfo}
            photo={this.state.photo}
          />
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
