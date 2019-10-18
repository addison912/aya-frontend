import React, { Component } from "react";

import { domain } from "../config/constants";

class LeftNav extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  getText() {
    fetch(`${domain}/api/test`)
      .then(res => {
        return res.json();
      })
      .then(text => {
        console.log(text);
        this.setState({ message: text.message });
      });
  }

  componentDidMount() {
    this.getText();
  }
  render() {
    return (
      <div>
        <p className="left-nav">{this.state.message}</p>
      </div>
    );
  }
}

export default LeftNav;
