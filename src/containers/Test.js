import React, { Component } from "react";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";

class Test extends Component {
  render() {
    return (
      <div className="main">
        <Logo className="logo" handleLogoClick={this.props.handleLogoClick} />
        <LeftNav categoryChangeHandler={this.categoryChangeHandler} />
        <div className="content">
          <div className="page-container">
            <h1>Test!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
