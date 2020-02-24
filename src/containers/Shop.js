import React, { Component } from "react";
import { domain } from "../config/constants";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";

class Shop extends Component {
  state = {
    photo: "",
    message: ""
  };

  componentDidMount() {
    this.props.setLocation("Shop");
  }

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
        <Logo className="logo" handleLogoClick={this.props.handleLogoClick} />
        <LeftNav
          categoryClickHandler={this.categoryClickHandler}
          selectedLink={"Shop"}
        />
        <div className="content">
          <div className="page-container">
            <h1>Shop, Coming Soon!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
