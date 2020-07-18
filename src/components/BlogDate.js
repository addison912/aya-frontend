import React, { Component } from "react";

class BlogDate extends Component {
  render() {
    return this.props.hideDate != true ? <time>{this.props.date}</time> : null;
  }
}

export default BlogDate;
