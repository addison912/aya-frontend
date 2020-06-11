import React from "react";

const adminContext = React.createContext({
  deletePhoto() {},
  deleteGallery() {},
  toState() {},
  categoryChangeHandler() {},
  uploadPhoto() {},
  addPhoto: false,
  location: "",
  category: "",
  galleryName: "",
  editgalleryName: false,
  updateGalleryName() {},
  gallery: {}
});

export default adminContext;
