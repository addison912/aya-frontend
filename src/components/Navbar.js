/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
      <div>
        <HamburgerMenu
          categoryClickHandler={this.props.categoryClickHandler}
          hamburgerMenu={this.props.hamburgerMenu}
          toggleHamburgerMenu={this.props.toggleHamburgerMenu}
          search={this.props.search}
          searchInput={this.props.searchInput}
          handleSearchInput={this.props.handleSearchInput}
        />
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
            {this.props.layout == "single" &&
            this.props.view == "gallery" &&
            !this.props.mobileInfo ? (
              <div className="icon-wrapper">
                <img
                  src={require("../assets/images/info-icon.svg")}
                  alt="info"
                  onClick={this.props.toggleMobileInfo}
                />
                <span>info</span>
              </div>
            ) : null}
            {this.props.layout == "single" &&
            this.props.view == "gallery" &&
            !!this.props.mobileInfo ? (
              <div className="icon-wrapper" style={{ zIndex: "8" }}>
                <img
                  src={require("../assets/images/info-icon-selected.svg")}
                  alt="info"
                  onClick={this.props.toggleMobileInfo}
                />
                <span>info</span>
              </div>
            ) : null}
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
      </div>
    );
  }
}

export default Navbar;
