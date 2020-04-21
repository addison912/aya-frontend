import React, { Component } from "react";
import { navigate, redirectTo } from "@reach/router";
import { frontendDomain } from "../config/constants";
import App from "../App";

class RedirectToNotFound extends Component {
  componentDidMount() {
    navigate(`/#/404`);
    window.location.reload();
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
