/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import Gallery from "../components/Gallery";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";
import Search from "../components/Search";
import BackButton from "../components/BackButton";
import LayoutIcons from "../components/BackButton";
import {
  Location,
  LocationProvider,
  Router,
  createHistory
} from "@reach/router";
import axios from "axios";
import { domain } from "../config/constants";
import TopNav from "../components/TopNav";

class Main extends Component {
  componentDidMount() {
    if (this.props.cat) {
      this.props.categoryChangeHandler(this.props.cat);
    } else if (!this.props.cat) {
      this.props.categoryChangeHandler("Home");
    }
    console.log(this.props);
    this.props.setLocation("Main");
    // axios.get(`${domain}/api/fail`);
    // this.props.toggleGalleryLayout("grid");
  }
  render() {
    return (
      <div className="main">
        <Logo className="logo" handleLogoClick={this.props.handleLogoClick} />
        <LeftNav
          categoryChangeHandler={this.props.categoryChangeHandler}
          layout={this.props.layout}
          toggleGalleryLayout={this.props.toggleGalleryLayout}
          showToggle={this.props.view == "gallery"}
          category={this.props.cat || this.props.category}
        />
        {this.props.view == "gallery" ? (
          <TopNav
            view={this.props.view}
            galleries={this.props.galleries}
            category={this.props.cat || this.props.category}
            categoryChangeHandler={this.props.categoryChangeHandler}
            layout={this.props.layout}
            toggleGalleryLayout={this.props.toggleGalleryLayout}
            showToggle={this.props.showToggle}
          ></TopNav>
        ) : null}
        <Search
          className="search-component"
          search={this.props.search}
          searchInput={this.props.searchInput}
          handleSearchInput={this.props.handleSearchInput}
        />

        <div className="content">
          {/* <Router> */}
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
          {/* <Gallery path={"/:gallery"} /> */}
          {/* </Router> */}
        </div>
      </div>
    );
  }
}

export default Main;
