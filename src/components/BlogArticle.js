import React, { Component } from "react";

class BlogArticle extends Component {
  render() {
    return (
      <article
        className="blog-article"
        dangerouslySetInnerHTML={{ __html: this.props.text }}
      ></article>
    );
  }
}

export default BlogArticle;
