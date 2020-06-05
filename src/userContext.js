import React from "react";

const userContext = React.createContext({
  email: "",
  password: "",
  token: null,
  user: false,
  verified: false,
  login() {},
  logout() {},
  toState() {},
  tokenCheck() {},
  verifyToken() {}
});

export default userContext;
