import React from "react";

const mainContext = React.createContext({
  searchInput: "",
  gallery: "",
  photoIndex: "",
  galleryLength: "",
  view: "",
  category: "",
  galleries: "",
  photo: "",
  layout: "",
  // setCategory() {},
  categoryChangeHandler() {},
  search() {},
  handleSearchInput() {},
  toggleGalleryLayout() {},
  clickPicture() {},
  getGalleries() {},
  galleryClick() {},
  photoClick() {},
  handleLogoClick() {},
  setLocation() {}
});

export default mainContext;

// setCategory={this.setCategory}
// categoryChangeHandler={this.categoryChangeHandler}
// search={this.search}
// handleSearchInput={this.handleSearchInput}
// toggleGalleryLayout={this.toggleGalleryLayout}
// clickPicture={this.clickPicture}
// getGalleries={this.getGalleries}
// galleryClick={this.galleryClick}
// photoClick={this.photoClick}
// handleLogoClick={this.handleLogoClick}
// setLocation={this.setLocation}

// searchInput={this.state.searchInput}
// gallery={this.state.gallery}
// photoIndex={this.state.photoIndex % this.state.galleryLength}
// galleryLength={this.state.galleryLength}
// view={this.state.view}
// category={this.state.category}
// galleries={this.state.galleries}
// photo={this.state.photo}
// layout={this.state.layout}
