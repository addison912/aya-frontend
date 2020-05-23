import React, { Component } from "react";

class BlogArticle extends Component {
  componentDidMount() {
    document.querySelectorAll(".post-text a").forEach(article => {
      article.target = "_blank";
    });
  }
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
