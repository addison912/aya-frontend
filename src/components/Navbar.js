/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, navigate, Link } from "@reach/router";
import LayoutIcons from "./LayoutIcons";
import HamburgerMenu from "./HamburgerMenu";

class Navbar extends Component {
  render() {
    return (
      <div
        id="navbar"
        className={
          !!window.location.pathname && window.location.pathname == "/about"
            ? "hide-icons"
            : null
        }
      >
        <div className="navbar-icons">
          <LayoutIcons
            layout={this.props.layout}
            toggleGalleryLayout={this.props.toggleGalleryLayout}
          />
          <div className="icon-wrapper">
            <img src={require("../assets/images/info-icon.svg")} alt="info" />
            <p>info</p>
          </div>
        </div>
        <div className="navbar-hamburger">
          {" "}
          <img
            src={require("../assets/images/hamburger.svg")}
            alt="menu"
            onClick={this.props.toggleHamburgerMenu}
            role="button"
          />
        </div>
      </div>
    );
  }
}

export default Navbar;
