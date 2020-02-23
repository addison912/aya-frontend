import React, { Component } from "react";

class BlogDate extends Component {
  render() {
    return <p className="blog-date">{this.props.date}</p>;
  }
}

export default BlogDate;
