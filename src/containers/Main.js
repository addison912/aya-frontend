import React, { Component } from "react";
import LeftNav from "../components/LeftNav";
import { domain } from "../config/constants";

class Main extends Component {
  state = {
    photo: null,
    message: "",
    category: "",
    galleries: [],
    layout: "single",
    picture: require("../assets/images/spinner.gif")
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

  getGallery() {
    fetch(`${domain}/api/gallery/c/Home`)
      .then(res => {
        return res.json();
      })
      .then(galleries => {
        this.setState({
          galleries
        });
        let image =
          domain +
          "/uploads/" +
          galleries[0].category +
          "/" +
          galleries[0].name +
          "/" +
          galleries[0].photos[
            Math.floor(Math.random() * galleries[0].photos.length)
          ].location;
        this.setState({ picture: image });
        console.log(image);
      });
  }

  componentDidMount() {
    this.getimages();
    this.getGallery();
  }

  render() {
    return (
      <div className="grid-wrapper">
        <div className="grid-container">
          <LeftNav />
          <div
            className="gallery"
            // style={{
            //   backgroundImage: this.state.picture
            // }}
          >
            {<img src={this.state.picture} alt="corgi" />}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
