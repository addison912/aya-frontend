import React, { Component } from "react";
import { domain } from "../config/constants";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";

class Shop extends Component {
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
    return (
      <div className="main">
        <Logo className="logo" />
        <LeftNav categoryClickHandler={this.categoryClickHandler} />
        <div className="content">
          <div className="page-container">
            <h1>Store Page Coming Soon</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
