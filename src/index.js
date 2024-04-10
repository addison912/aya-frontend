import { render } from "react-dom";
import { Router } from "@reach/router";
import RedirectToNotFound from "./containers/RedirectToNotFound";
import App from "./App";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "UA-16962571-1",
};
TagManager.initialize(tagManagerArgs);

render(
  <Router>
    <RedirectToNotFound path="/*" default />
    <App path="/" />
  </Router>,
  document.getElementById("root"),
);
