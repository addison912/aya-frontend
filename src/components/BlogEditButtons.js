/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { domain } from "../config/constants";

class BlogEdit extends Component {
  render() {
    return (
      <div className="blog-edit-buttons">
        <button
          className="delete"
          onClick={() => this.props.deletePost(this.props.post._id)}
        >
          DELETE POST
        </button>
      </div>
    );
  }
}

export default BlogEdit;
