import React, { Component } from "react";
import { navigate } from "@reach/router";

class RedirectToNotFound extends Component {
  componentDidMount() {
    if (window.location && window.location.href.indexOf("/#/") > -1) {
      navigate(`/#/404`);
      window.location.reload();
    } else if (window.location && window.location.pathname) {
      navigate(`${window.location.origin}/#${window.location.pathname}`);
      window.location.reload();
    } else {
      navigate(`/#/404`);
      window.location.reload();
    }
  }
  render() {
    return (
      <div className="page-container redirect">
        <div className="loading-wrapper">
          <div className="loading-container">
            <h1 className="loading">
              Page not found. Redirecting your request
            </h1>
          </div>
          <div className="ellipsis-container">
            <h1 className="ellipsis-wrapper">
              {" "}
              <span className="ellipsis"></span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default RedirectToNotFound;
