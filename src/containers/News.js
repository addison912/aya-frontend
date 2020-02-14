import React, { Component } from "react";
import { domain } from "../config/constants";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";
import BlogPost from "../components/BlogPost";

class News extends Component {
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
        <Logo className="logo" handleLogoClick={this.props.handleLogoClick} />
        <LeftNav categoryClickHandler={this.categoryClickHandler} />
        <div className="blog content">
          <BlogPost />
        </div>
      </div>
    );
  }
}

export default News;
