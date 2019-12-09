import React, { Component } from "react";
import { domain } from "../config/constants";

class Gallery extends Component {
  state = { picture: require("../assets/images/spinner.gif") };

  componentDidMount() {
    this.getImages();
    this.getGallery();
  }

  getImages = () => {
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
    this.path;
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

  render() {
    return (
      <div className="gallery row-12">
        {<img src={this.state.picture} alt="corgi" />}
      </div>
    );
  }
}

export default Gallery;
