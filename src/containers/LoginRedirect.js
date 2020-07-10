import React, { Component } from "react";
import { navigate } from "@reach/router";

class LoginRedirect extends Component {
  componentDidMount() {
    this.props.googleLogin(this.props.token);
  }
  render() {
    return (
      <div className="page-container redirect">
        <div className="loading-wrapper">
          <div className="loading-container">
            <h1 className="loading">Signing in</h1>
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

export default LoginRedirect;
