import React from "react";

const aboutContext = React.createContext({
  editPost: "",
  addPost: false,
  toState() {},
  numDate() {},
  uploadPost() {}
});

export default aboutContext;
