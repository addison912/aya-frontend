/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, navigate, Link } from "@reach/router";

class Logo extends Component {
  render() {
    return (
      <div className="logo" onClick={this.props.handleLogoClick}>
        <Link to="/">
          <img
            src={require("../assets/images/logo-aya_brackett.svg")}
            alt="Aya Brackett logo"
            id="logo-image"
          />
        </Link>
      </div>
    );
  }
}

export default Logo;
