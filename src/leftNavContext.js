import React from "react";

const leftNavContext = React.createContext({
  location: "",
  view: "",
  category: "",
  layout: "",
  categoryChangeHandler() {},
  toggleGalleryLayout() {},
});

export default leftNavContext;
