import React, { Component } from "react";

class BlogDate extends Component {
  render() {
    return <time>{this.props.date}</time>;
  }
}

export default BlogDate;
