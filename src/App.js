import React from "react";
import {
  createHistory,
  LocationProvider,
  Router,
  navigate
} from "@reach/router";
// import mainContext from "./mainContext";
import axios from "axios";
import { categories } from "./config/constants";

import Logo from "./components/Logo";
import Search from "./components/Search";
import TopNav from "./components/TopNav";
import { createHashSource } from "reach-router-hash-history";
const history = createHistory(createHashSource());

import Main from "./containers/Main";
import About from "./containers/About";
import News from "./containers/News";
import Shop from "./containers/Shop";
import { domain } from "./config/constants";
import Navbar from "./components/Navbar";
import MobileInfo from "./components/MobileInfo";
import LeftNav from "./components/LeftNav";
import SearchMessage from "./components/SearchMessage";
import NotFound from "./containers/NotFound";
import userContext from "./context/userContext";
import adminContext from "./context/adminContext";
import PrivateRoute from "./components/PrivateRoute";
import Test from "./containers/Test";
import LoginRedirect from "./containers/LoginRedirect";

//dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      location: "",
      searchQuery: "",
      //admin userContext
      email: "",
      user: false,
      password: "",
      token: window.sessionStorage.ayaToken || null,
      verified: false,
      loaded: null,
      login: this.login,
      logout: this.logout,
      toState: this.toState,
      tokenCheck: this.tokenCheck,
      verifyToken: this.verifyToken,
      googleLogin: this.googleLogin,
      //admin adminContext
      deletePhoto: this.deletePhoto,
      deleteGallery: this.deleteGallery,
      categoryChangeHandler: this.categoryChangeHandler,
      updateGalleryName: this.updateGalleryName,
      uploadPhoto: this.uploadPhoto,
      addPhoto: false,
      editPhoto: false,
      copyPhoto: false,
      photoEdit: this.photoEdit,
      editgalleryName: false,
      galleryName: "",
      addGallery: false,
      createGallery: this.createGallery,
      reorderGallery: this.reorderGallery,
      hideGallery: this.hideGallery
    };
  }

  /*/// ↓ ADMIN ↓ ///*/
  login = e => {
    e.preventDefault;
    console.log(`logging in ${this.state.email}...`);
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return await response;
    }
    postData(`${domain}/auth/login`, {
      data: btoa(
        JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      )
    })
      .then(res => {
        this.setState({
          password: ""
        });
        if (res.status != 200) {
          alert(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.signedJwt) {
          sessionStorage.setItem("ayaToken", data.signedJwt);
          this.setState({
            token: data.signedJwt,
            verified: true
          });
        }
      });
  };

  googleLogin = response => {
    if (response.tokenId) {
      this.setState(state => ({
        isLogined: true,
        tokenId: response.tokenId
      }));
      console.log(response);
      axios
        .post(
          `${domain}/auth/login/google`,
          { token: response.tokenId },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          // if (res.data) {
          //   console.log(res);
          // }
          if (res.data.signedJwt) {
            sessionStorage.setItem("ayaToken", res.data.signedJwt);
            this.setState({
              token: res.data.signedJwt,
              verified: true
            });
          } else if (res.status != 200) {
            alert(`Error ${res.status}: ${res.statusText}`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  logout = () => {
    console.log("logging out ...");
    sessionStorage.removeItem("ayaToken");
    navigate("/");
    this.setState({
      token: null,
      verified: false,
      email: "",
      user: false,
      password: ""
    });
  };

  toState = input => {
    this.setState(input);
  };

  tokenCheck = () => {
    if (window.sessionStorage.ayaToken) {
      this.setState({ token: window.sessionStorage.ayaToken });
    } else {
      this.setState({ token: null });
    }
  };

  verifyToken = cb => {
    async function evaluateToken() {
      let verified = new Promise((resolve, reject) => {
        // setTimeout(() => {
        //   reject;
        // }, 3000);
        console.log("checking credentials");
        async function postData(url = "", data = {}) {
          const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: "bearer " + window.sessionStorage.ayaToken
            }
          });
          return await response;
        }
        if (window.sessionStorage.ayaToken) {
          postData(`${domain}/auth/verify`, {})
            .then(res => {
              if (res.status != 200) {
                // alert(`Error ${res.status}: ${res.statusText}`);
                window.sessionStorage.removeItem("ayaToken");
                resolve(false);
              }
              return res.json();
            })
            .then(data => {
              console.log(data);
              if (data.token && data.token == window.sessionStorage.ayaToken) {
                resolve(true);
              } else {
                window.sessionStorage.removeItem("ayaToken");
                resolve(false);
              }
            });
        } else {
          window.sessionStorage.removeItem("ayaToken");
          resolve(false);
        }
      });
      return await verified;
    }
    evaluateToken().then(verified => {
      this.setState({ verified, loaded: true });
      if (cb) {
        cb;
      }
    });
  };

  hideGallery = (gallery, bool) => {
    console.log(`${gallery._id}`);
    let currentGallery = this.state.gallery;
    currentGallery.hideGallery = bool;
    this.setState({ gallery: currentGallery });
    axios
      .post(
        `${domain}/api/gallery/hide/${gallery._id}`,
        { bool },
        {
          headers: {
            authorization: `bearer ${window.sessionStorage.ayaToken}`
          }
        }
      )
      .then(res => {
        if (res.data) {
          console.log(res.data);
          this.setState({ gallery: res.data });
        }
      });
  };

  createGallery = (gallery, category) => {
    let newGallery = new FormData();
    newGallery.append("name", gallery.name);
    newGallery.append("order", gallery.order);
    newGallery.append("category", category);
    newGallery.append("thumb", gallery.thumb);
    newGallery.append("hideGallery", gallery.hideGallery);

    // for (var value of newGallery.values()) {
    //   console.log(value);
    // }
    axios
      .post(`${domain}/api/gallery/create`, newGallery, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        let newGallery = res.data;
        console.log(newGallery);
        if (newGallery) {
          this.setState({ gallery: newGallery });
        } else {
          alert(
            "There was an error creating the gallery. Please refresh the page."
          );
        }

        navigate(
          `/#/${newGallery.category
            .toLowerCase()
            .replace(/\/?\s+/g, "-")}/${newGallery.name
            .toLowerCase()
            .replace(/\/?\s+/g, "-")}`
        );
        this.setState({ view: "gallery" });
      });
  };

  deleteGallery = id => {
    let confirmed = confirm(
      "Are you sure you want to delete this gallery? This will permanently delete the gallery and all photos contained within."
    );
    if (confirmed == true) {
      axios
        .delete(`${domain}/api/gallery/delete/${id}`, {
          headers: {
            authorization: `bearer ${window.sessionStorage.ayaToken}`
          }
        })
        .then(response => {
          // console.log(response.data);
          // console.log("Deleting gallery " + id);
          let galleries = this.state.galleries;
          galleries.splice(
            galleries
              .map(i => {
                return i._id;
              })
              .indexOf(id),
            1
          );
          this.setState({ galleries });
        })
        .catch(error => {
          alert("A server error occured");
          throw error.response.data;
        });
    }
  };

  updateGalleryName = (name, id, category) => {
    this.setState({ editgalleryName: false });
    axios
      .post(
        `${domain}/api/gallery/rename/${id}`,
        { name },
        {
          headers: {
            authorization: `bearer ${window.sessionStorage.ayaToken}`
          }
        }
      )
      .then(res => {
        if (res.data) {
          this.setState({ gallery: res.data });
        }
        navigate(
          `/#/${category
            .toLowerCase()
            .replace(/\/?\s+/g, "-")}/${name
            .toLowerCase()
            .replace(/\/?\s+/g, "-")}`
        );
      });
  };

  reorderGallery = () => {
    console.log("reordering gallery");
    let updatedGalleryOrder = [];
    let galleries = this.state.galleries;
    for (let i = 0; i < galleries.length; i++) {
      let gallery = { _id: galleries[i]._id, order: i + 1 };
      updatedGalleryOrder.push(gallery);
    }
    // console.log("updatedGalleryOrder");
    axios
      .post(`${domain}/api/gallery/reorder`, updatedGalleryOrder, {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${window.sessionStorage.ayaToken}`
        }
      })
      .catch(err => {
        console.log(err);
        alert("reordering gallery failed");
      });
  };

  uploadPhoto = (photoData, gallery, category, galleryId) => {
    if (!photoData.photo) {
      return alert("Please choose a photo to upload!");
    }

    photoData.category = category;
    photoData.gallery = gallery;

    let formData = new FormData();
    formData.append("file", photoData.photo);
    formData.append("category", category);
    formData.append("gallery", gallery);
    formData.append("order", photoData.order);
    formData.append("caption", photoData.caption);
    formData.append("searchTags", photoData.searchTags);

    axios
      .post(`${domain}/api/photo/add/${galleryId}`, formData, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.data) {
          this.setState({ gallery: res.data, addPhoto: false });
        }
      });
  };

  photoEdit = (photo, edits) => {
    if (photo.order) {
      photo.order = parseInt(photo.order);
    }
    let reordered = false;
    if (photo.order != edits.order) {
      let oldOrder = photo.order;
      let newOrder = edits.order;
      let updatedGallery = this.state.gallery;
      if (newOrder > oldOrder) {
        updatedGallery.photos.forEach(photo => {
          if (
            photo.order &&
            photo.order > oldOrder &&
            photo.order <= newOrder
          ) {
            photo.order--;
          }
        });
      } else if (newOrder < oldOrder) {
        updatedGallery.photos.forEach(photo => {
          if (
            photo.order &&
            photo.order < oldOrder &&
            photo.order >= newOrder
          ) {
            photo.order++;
          }
        });
      }

      this.setState({ editPhoto: false });
      reordered = updatedGallery;
    }

    try {
      let newPhoto = photo;
      if (edits.caption) {
        newPhoto.caption = edits.caption;
      }
      if (edits.order) {
        newPhoto.order = edits.order;
      }
      if (edits.searchTags) {
        newPhoto.searchTags = edits.searchTags;
      }
      axios
        .post(
          `${domain}/api/photo/edit/${photo._id}`,
          { newPhoto, reordered },
          {
            headers: {
              authorization: `bearer ${window.sessionStorage.ayaToken}`,
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.data) {
            let gallery = res.data;
            gallery.photos.sort(function(a, b) {
              return a.order - b.order;
            });
            this.setState({ gallery, editPhoto: false });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  deletePhoto = (id, location) => {
    try {
      let d = confirm("Are you sure you want to delete this photo?");
      if (d == true) {
        axios
          .delete(`${domain}/api/photo/id/${id}/location/${location}`, {
            headers: {
              authorization: `bearer ${window.sessionStorage.ayaToken}`
            }
          })
          .then(response => {
            let gallery = this.state.gallery;
            gallery.photos.splice(
              gallery.photos
                .map(i => {
                  return i._id;
                })
                .indexOf(id),
              1
            );
            this.setState({ gallery });
          })
          .catch(error => {
            console.log(error.response);

            if (error.response.status == 403) {
              this.logout();
            }
          });
      } else {
        console.log("Deletion cancelled");
      }
    } catch (err) {
      console.log("Deletion Error: " + err);
    }
  };
  /*/// ↑ ADMIN ↑ ///*/

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

  galleryClick = gallery => {
    navigate(
      `/#/${this.state.category
        .toLowerCase()
        .replace(/\/?\s+/g, "-")}/${gallery.name
        .toLowerCase()
        .replace(/\/?\s+/g, "-")}`
    );
    // let i = e.target.closest("figure").getAttribute("data");
    // let gallery = this.state.galleries[i];
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
    // this.setGallery(i);
    this.setState({ galleryLength: gallery.photos.length });
    window.galleries = this.state.galleries; //delete me
  };

  categoryChangeHandler = (category, galleryName) => {
    if (category.toLowerCase() != "home") {
      navigate(`/#/${category.replace(/\/?\s+/g, "-").toLowerCase()}`);
    } else {
      navigate(`/`);
    }
    this.setState({
      category,
      gallery: {},
      galleries: [],
      photoIndex: 0,
      galleryIndex: 0,
      galleryLength: 0
    });
    this.getGalleries(category, galleryName);
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

  getGalleries = (category, galleryName) => {
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

        for (let n = 0; n < galleries.length; n++) {
          if (!galleries[n].order) {
            galleries[n].order = galleries.length + n;
          }
          galleries[n].photos.sort(function(a, b) {
            return a.order - b.order;
          });
          for (let i = 0; i < galleries[n].photos.length; i++) {
            galleries[n].photos[i].order = i + 1;
          }
        }
        galleries.sort(function(a, b) {
          return a.order - b.order;
        });
        console.log(galleries);
        this.setState({
          galleries,
          photoIndex,
          galleryIndex: 0
        });

        if (galleries.length > 1 && !galleryName) {
          this.setState({ view: "category" });
        } else if (galleryName) {
          let gallery = galleries.find(galleries => {
            return (
              galleries.name.replace(/\/?\s+/g, "-").toLowerCase() ==
              galleryName.toLowerCase()
            );
          });
          this.setState({
            view: "gallery",
            galleryLength: gallery.photos.length,
            layout: "grid",
            gallery
          });
          this.setPictureUrl();
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
  searchQuery = q => {
    this.setState({ category: "Search", searchQuery: q });
    if (this.state.hamburgerMenu == true) {
      this.setState({ hamburgerMenu: false });
    }
    if (document.querySelector(".category-link-selected")) {
      document
        .querySelector(".category-link-selected")
        .classList.remove("category-link-selected");
    }
    fetch(`${domain}/api/photo/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: q })
    })
      .then(res => {
        return res.json();
      })
      .then(photos => {
        this.setState({
          category: "Search",
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
  };
  search = e => {
    e.preventDefault(this.state.searchInput);
    if (this.state.searchInput.length > 0) {
      this.setState({ category: "Search" });
      navigate(`/#/Search/${this.state.searchInput}`);
      this.searchQuery(this.state.searchInput);
    } else {
      document.querySelector(".search").focus();
    }
  };

  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  clearSearch = () => this.setState({ searchInput: "" });

  //////
  clickPicture = dir => {
    // document.querySelector(".single-pic").classList.add("fade-out");
    let newIndex = this.state.photoIndex;
    if (dir == "next" || dir == "Left") {
      newIndex++;
    } else if (dir == "prev" || dir == "Right") {
      newIndex--;
    }
    if (newIndex <= -1) {
      newIndex = this.state.galleryLength - 1;
    }
    // setTimeout(() => {
    this.setState({ photoIndex: newIndex });
    this.setPictureUrl(newIndex);
    // }, 500);
  };

  /////
  photoClick = i => {
    this.setState({ layout: "single", photoIndex: i });
    this.setPictureUrl(i);
    this.setGalleryLength();
  };

  setPictureUrl = i => {
    let index = i ? i : this.state.photoIndex;
    // index = index == 0 ? 1 : index;
    index = index % this.state.gallery.photos.length;
    let photo = this.state.gallery.photos[index];
    let url = `${domain}/uploads/photos/${
      photo.category.toLowerCase() == "advertising"
        ? "Client-Work"
        : photo.category.replace(/\/?\s+/g, "_")
    }/${photo.gallery.replace(/\/?\s+/g, "_").replace(/[^\w\s]/gi, "")}/${
      photo.location
    }`;
    photo.url = url;
    this.setState({ photo });
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
    this.setState({ loaded: false });
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
    //initialize cursor
  }

  render() {
    return (
      <React.StrictMode>
        <LocationProvider history={history}>
          <DndProvider backend={HTML5Backend}>
            <adminContext.Provider value={this.state}>
              <userContext.Provider value={this.state}>
                <div
                  id="App"
                  className={
                    this.state.location == "Login" ? "no-padding" : null
                  }
                >
                  <Router
                    className={
                      this.state.hamburgerMenu || this.state.mobileInfo
                        ? "router background-blur"
                        : "router unblur"
                    }
                  >
                    <NotFound
                      path="404"
                      categoryChangeHandler={this.categoryChangeHandler}
                      handleLogoClick={this.handleLogoClick}
                      default
                    ></NotFound>
                    <LoginRedirect
                      path="google-redirect/:token"
                      googleLogin={this.googleLogin}
                    ></LoginRedirect>
                    {categories.map(category => {
                      // category = category.toLowerCase().replace(/\/?\s+/g, "-");
                      return (
                        <PrivateRoute
                          as={Main}
                          key={category}
                          path={category.toLowerCase().replace(/\/?\s+/g, "-")}
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
                          photoIndex={
                            this.state.photoIndex % this.state.galleryLength
                          }
                          galleryClick={this.galleryClick}
                          gallery={this.state.gallery}
                          photoClick={this.photoClick}
                          handleLogoClick={this.handleLogoClick}
                          setLocation={this.setLocation}
                          searchQuery={this.searchQuery}
                          clearSearch={this.clearSearch}
                        />
                      );
                    })}
                    {categories.map(category => {
                      // category = category.toLowerCase().replace(/\/?\s+/g, "-");
                      return (
                        <PrivateRoute
                          as={Main}
                          key={category}
                          path={`${category
                            .toLowerCase()
                            .replace(/\/?\s+/g, "-")}/:galleryName`}
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
                          photoIndex={
                            this.state.photoIndex % this.state.galleryLength
                          }
                          galleryClick={this.galleryClick}
                          gallery={this.state.gallery}
                          photoClick={this.photoClick}
                          handleLogoClick={this.handleLogoClick}
                          setLocation={this.setLocation}
                          searchQuery={this.searchQuery}
                          clearSearch={this.clearSearch}
                        />
                      );
                    })}
                    <PrivateRoute
                      as={About}
                      path="about"
                      categoryChangeHandler={this.categoryChangeHandler}
                      handleLogoClick={this.handleLogoClick}
                      setLocation={this.setLocation}
                    />
                    <PrivateRoute
                      as={News}
                      path="news"
                      categoryChangeHandler={this.categoryChangeHandler}
                      handleLogoClick={this.handleLogoClick}
                      setLocation={this.setLocation}
                    />
                    <PrivateRoute
                      as={News}
                      path="news/:postId"
                      categoryChangeHandler={this.categoryChangeHandler}
                      handleLogoClick={this.handleLogoClick}
                      setLocation={this.setLocation}
                    />
                    <PrivateRoute
                      as={Shop}
                      path="shop"
                      categoryChangeHandler={this.categoryChangeHandler}
                      handleLogoClick={this.handleLogoClick}
                      setLocation={this.setLocation}
                    />
                    <PrivateRoute
                      as={Main}
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
                      photoIndex={
                        this.state.photoIndex % this.state.galleryLength
                      }
                      galleryClick={this.galleryClick}
                      gallery={this.state.gallery}
                      photoClick={this.photoClick}
                      handleLogoClick={this.handleLogoClick}
                      setLocation={this.setLocation}
                      searchQuery={this.searchQuery}
                      clearSearch={this.clearSearch}
                    />
                    <PrivateRoute
                      as={Main}
                      path="Search/:query"
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
                      photoIndex={
                        this.state.photoIndex % this.state.galleryLength
                      }
                      galleryClick={this.galleryClick}
                      gallery={this.state.gallery}
                      photoClick={this.photoClick}
                      handleLogoClick={this.handleLogoClick}
                      setLocation={this.setLocation}
                      searchQuery={this.searchQuery}
                      clearSearch={this.clearSearch}
                    />
                    <Test path="test"></Test>
                  </Router>
                  {this.state.verified ? (
                    <Logo handleLogoClick={this.handleLogoClick} />
                  ) : null}
                  {this.state.verified ? (
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
                      location={this.state.location}
                    />
                  ) : null}
                  {this.state.verified ? (
                    <MobileInfo
                      mobileInfo={this.state.mobileInfo}
                      toggleMobileInfo={this.toggleMobileInfo}
                      photo={this.state.photo}
                    />
                  ) : null}
                  {this.state.verified ? (
                    <LeftNav
                      location={this.state.location}
                      view={this.state.view}
                      category={this.state.category}
                      layout={this.state.layout}
                      categoryChangeHandler={this.categoryChangeHandler}
                      toggleGalleryLayout={this.toggleGalleryLayout}
                    />
                  ) : null}

                  {this.state.view == "gallery" &&
                  this.state.location == "Main" ? (
                    this.state.layout == "grid" &&
                    this.state.category == "Search" ? (
                      <SearchMessage
                        searchQuery={this.state.searchQuery}
                        galleryLength={this.state.galleryLength}
                      ></SearchMessage>
                    ) : (
                      <TopNav
                        view={this.state.view}
                        galleries={this.state.galleries}
                        category={this.state.category}
                        categoryChangeHandler={this.categoryChangeHandler}
                        layout={this.state.layout}
                        toggleGalleryLayout={this.toggleGalleryLayout}
                        location={this.state.locations}
                      ></TopNav>
                    )
                  ) : null}
                  {this.state.location == "Main" ? (
                    <Search
                      className="search-component"
                      search={this.search}
                      searchInput={this.state.searchInput}
                      handleSearchInput={this.handleSearchInput}
                    />
                  ) : null}
                  <div id="cursor">
                    <img
                      alt="Cursor Arrow"
                      src={`${domain}/assets/up-arrow.svg`}
                    />
                  </div>
                </div>
              </userContext.Provider>
            </adminContext.Provider>
          </DndProvider>
        </LocationProvider>
      </React.StrictMode>
    );
  }
}

export default App;
