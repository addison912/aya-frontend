import React, { Component } from "react";
import { Router, navigate, Link } from "@reach/router";
import Gallery from "../components/Gallery";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";
import Search from "../components/Search";
import LayoutIcons from "../components/LayoutIcons";
import BackButton from "../components/BackButton";

class Main extends Component {
  componentDidMount() {
    if (this.props.cat && this.props.cat != this.props.category) {
      this.props.setCategory(this.props.cat);
    }
  }
  render() {
    return (
      <div className="main">
        <Logo className="logo" handleLogoClick={this.props.handleLogoClick} />
        <LeftNav categoryClickHandler={this.props.categoryClickHandler} />
        {this.props.view == "gallery" && this.props.galleries.length > 1 ? (
          <BackButton
            category={this.props.category}
            setCategory={this.props.setCategory}
          />
        ) : null}

        <Search
          className="search-component"
          search={this.props.search}
          searchInput={this.props.searchInput}
          handleSearchInput={this.props.handleSearchInput}
        />
        <LayoutIcons
          layout={this.props.layout}
          toggleGalleryLayout={this.props.toggleGalleryLayout}
        />
        <div className="content">
          <Gallery
            photo={this.props.photo}
            clickPicture={this.props.clickPicture}
            category={this.props.category}
            galleries={this.props.galleries} // don't forget to remove this
            getGalleries={this.props.getGalleries}
            layout={this.props.layout}
            view={this.props.view}
            galleryLength={this.props.galleryLength}
            photoIndex={(this.props.photoIndex % this.props.galleryLength) + 1}
            galleryClick={this.props.galleryClick}
            gallery={this.props.gallery}
            photoClick={this.props.photoClick}
          />
          {/* <Gallery path={"/:gallery"} /> */}
        </div>
      </div>
    );
  }
}

export default Main;
