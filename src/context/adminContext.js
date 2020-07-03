import React from "react";

const adminContext = React.createContext({
  deletePhoto() {},
  deleteGallery() {},
  toState() {},
  categoryChangeHandler() {},
  uploadPhoto() {},
  addPhoto: false,
  editPhoto: false,
  photoEdit() {},
  location: "",
  category: "",
  galleryName: "",
  editgalleryName: false,
  updateGalleryName() {},
  createGallery() {},
  gallery: {},
  reorderGallery() {}
});

export default adminContext;