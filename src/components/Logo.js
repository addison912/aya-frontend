/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Link } from "@reach/router";

class Logo extends Component {
  render() {
    return (
      <div className="logo-wrapper">
        <Link to="/" className="logo" onClick={this.props.handleLogoClick}>
          Aya Brackett
        </Link>
      </div>
    );
  }
}

export default Logo;
