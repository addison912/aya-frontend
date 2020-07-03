import React from "react";

const aboutContext = React.createContext({
  clients: [],
  bio: "",
  press: [],
  contact: [],
  edit: "",
  toState() {}
});

export default aboutContext;
