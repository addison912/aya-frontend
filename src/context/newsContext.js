import React from "react";

const aboutContext = React.createContext({
  editPost: {},
  addPost: false,
  toState() {},
  numDate() {},
  uploadPost() {},
  newsEdit() {},
  handlePostEdit() {},
  deletePhoto() {},
  editPhoto: {},
  handlePhotoEditInputChange() {},
  cancelPhotoEdit() {},
  submitPhotoEdit() {}
});

export default aboutContext;
