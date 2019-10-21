import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { domain, categories } from "../config/constants";

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
        this.setState({ message: text.message });
      });
  }

  componentDidMount() {
    this.getText();
  }
  render() {
    return (
      <div className="left-nav">
        <p>Aya Brackett</p>
        <ul className="galleries-list">
          {categories.map(category => (
            <li key={category}>
              {category}
              {/* <Link>Still Life</Link> */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LeftNav;
