import React, { Component } from "react";
import { navigate, redirectTo } from "@reach/router";
import { frontendDomain } from "../config/constants";
import App from "../App";

class RedirectToNotFound extends Component {
  componentDidMount() {
    console.log(this.props);
    navigate(`/#/404`);
    window.location.reload();
  }
  render() {
    return (
      <div className="pageContainer redirect">
        <h1>Page not found. Redirecting your request.</h1>
      </div>
    );
  }
}

export default RedirectToNotFound;
