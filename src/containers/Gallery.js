import React, { Component } from "react";
import { domain } from "../config/constants";

class Gallery extends Component {
  state = {
    photo: "",
    message: ""
  };

  getimages = () => {
    fetch(`${domain}/api/test`)
      .then(res => {
        return res.json();
      })
      .then(text => {
        console.log(text);
        this.setState({ message: text.message });
      });
  };
  render() {
    return <h1>{this.state.message}</h1>;
  }
}

export default Gallery;
