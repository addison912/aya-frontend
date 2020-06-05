import React from "react";

const userContext = React.createContext({
  email: "",
  password: "",
  token: null,
  user: false,
  login() {},
  logout() {},
  toState() {},
  tokenCheck() {}
});

export default userContext;
