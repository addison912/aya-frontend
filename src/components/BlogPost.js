import React, { Component } from "react";
import BlogTitle from "../components/BlogTitle";
import BlogDate from "../components/BlogDate";
import BlogArticle from "../components/BlogArticle";
import BlogImages from "../components/BlogImages";

class BlogPost extends Component {
  render() {
    return (
      <div className="blog-post">
        <div className="blog-text-container">
          {" "}
          <BlogTitle />
          <BlogDate />
          <BlogArticle />
        </div>

        <BlogImages />
      </div>
    );
  }
}

export default BlogPost;
