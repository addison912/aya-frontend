/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { Router, navigate, Link } from "@reach/router";
import LayoutIcons from "./LayoutIcons";
import HamburgerMenu from "./HamburgerMenu";

class Navbar extends Component {
  // componentDidUpdate() {
  //   console.log(this.props);
  // }
  render() {
    return (
      <div>
        <HamburgerMenu
          categoryChangeHandler={this.props.categoryChangeHandler}
          hamburgerMenu={this.props.hamburgerMenu}
          toggleHamburgerMenu={this.props.toggleHamburgerMenu}
          search={this.props.search}
          searchInput={this.props.searchInput}
          handleSearchInput={this.props.handleSearchInput}
          category={this.props.category}
          location={this.props.location}
        />
        <div
          id="navbar"
          className={this.props.container != "Main" ? "hide-icons" : null}
        >
          <div className="navbar-icons no-highlight">
            {this.props.view == "gallery" && this.props.galleries > 1 ? (
              <div
                className="icon-wrapper"
                onClick={() =>
                  this.props.categoryChangeHandler(this.props.category)
                }
              >
                <img
                  src={require("url:../assets/images/back-nav.svg")}
                  alt="previous"
                  className="index-arrow"
                />
                <span>Back</span>
              </div>
            ) : null}
            {this.props.view == "gallery" ? (
              <LayoutIcons
                layout={this.props.layout}
                toggleGalleryLayout={this.props.toggleGalleryLayout}
              />
            ) : null}

            {this.props.layout == "single" &&
            this.props.view == "gallery" &&
            !this.props.mobileInfo ? (
              <div className="icon-wrapper">
                <img
                  src={require("url:../assets/images/info-icon.svg")}
                  alt="info"
                  onClick={this.props.toggleMobileInfo}
                />
                <span>Caption</span>
              </div>
            ) : null}
            {this.props.layout == "single" &&
            this.props.view == "gallery" &&
            !!this.props.mobileInfo ? (
              <div className="icon-wrapper" style={{ zIndex: "8" }}>
                <img
                  src={require("url:../assets/images/info-icon-selected.svg")}
                  alt="info"
                  onClick={this.props.toggleMobileInfo}
                />
                <span>Caption</span>
              </div>
            ) : null}
          </div>
          <div className="icon-wrapper">
            <div
              className={
                this.props.hamburgerMenu ? "no-highlight open" : "no-highlight"
              }
              id="nav-icon"
              onClick={this.props.toggleHamburgerMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Menu</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
