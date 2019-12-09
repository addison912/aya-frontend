import React, { Component } from "react";
import { domain } from "../config/constants";

class About extends Component {
  state = {
    photo: "",
    message: ""
  };

  //   getimages = () => {
  //     fetch(`${domain}/api/test`)
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(text => {
  //         console.log(text);
  //         this.setState({ message: text.message });
  //       });
  //   };
  render() {
    // return <h1>{this.state.message}</h1>;
    return <div className=".about-container">About</div>;
  }
}

export default About;
