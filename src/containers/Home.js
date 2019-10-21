import React, { Component } from "react";
import LeftNav from "../components/LeftNav";
import { domain } from "../config/constants";

class Home extends Component {
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

  componentDidMount() {
    this.getimages();
  }

  render() {
    return (
      <div className="grid-wrapper">
        <div className="grid-container">
          <LeftNav />
          <div className="gallery">
            {/* <img src="http://placecorgi.com/1200" alt="corgi" /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
