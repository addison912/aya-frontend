import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { domain, categories } from "../config/constants";

class LeftNav extends Component {
  state = {
    message: "",
    galleries: []
  };

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
        <img
          src={`${domain}/assets/logo-aya_brackett.png`}
          alt="Aya Brackett logo"
        />
        <ul className="galleries-list">
          {categories.map(category => (
            <li key={category}>
              {category}
              {/* <Link>Still Life</Link> */}
            </li>
          ))}
        </ul>
        <nav className="links">
          <ul>
            <li>About</li>
            <li>News</li>
            <li>Shop</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default LeftNav;
