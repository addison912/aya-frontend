/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, navigate, Link } from "@reach/router";

class Logo extends Component {
  render() {
    return (
      <Link to="/" className="logo" onClick={this.props.handleLogoClick}></Link>
    );
  }
}

export default Logo;
