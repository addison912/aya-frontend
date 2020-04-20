import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import RedirectToNotFound from "./containers/RedirectToNotFound";

import App from "./App";

render(
  <Router>
    <RedirectToNotFound path="/*" default />
    <App path="/" />
  </Router>,
  document.getElementById("root")
);
