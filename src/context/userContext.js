import React from "react";

const userContext = React.createContext({
  email: "",
  password: "",
  token: null,
  loaded: null,
  user: false,
  verified: false,
  login() {},
  logout() {},
  toState() {},
  tokenCheck() {},
  verifyToken() {},
  googleLogin() {}
});

export default userContext;
