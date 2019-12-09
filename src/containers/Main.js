import React, { Component } from "react";
import LeftNav from "../components/LeftNav";
import { domain } from "../config/constants";
import { Router, navigate, Link } from "@reach/router";
import About from "./About";
import Gallery from "../components/Gallery";

class Main extends Component {
  state = {
    photo: null,
    message: "",
    category: "",
    gallery: "",
    galleries: [],
    layout: "single",
    caption: ""
  };

  toggleGalleryLayout = e => {
    this.setState({ layout: e.target.getAttribute("data") });
  };

  categoryClickHandler = e => {};

  render() {
    return (
      <div className="main">
        <LeftNav toggleGalleryLayout={this.toggleGalleryLayout} />
        <Router>
          <Gallery layout={this.state.layout} path={"/*"} />
          {/* <Gallery path={"/:gallery"} /> */}
          <About path="about" />
        </Router>
      </div>
    );
  }
}

export default Main;
