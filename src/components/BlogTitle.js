import React, { Component } from "react";

class BlogTitle extends Component {
  render() {
    return <div className="blog-title">{this.props.title}</div>;
  }
}

export default BlogTitle;
