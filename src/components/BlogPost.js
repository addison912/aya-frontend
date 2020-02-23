import React, { Component } from "react";
import BlogTitle from "../components/BlogTitle";
import BlogDate from "../components/BlogDate";
import BlogArticle from "../components/BlogArticle";
import BlogImages from "../components/BlogImages";

class BlogPost extends Component {
  render() {
    return (
      <div className="news-post">
        <div className="post-text">
          {" "}
          <BlogTitle title={this.props.post.title} />
          <BlogDate date={this.props.post.date} />
          <BlogArticle text={this.props.post.text} />
        </div>

        <BlogImages photos={this.props.post.photos} />
      </div>
    );
  }
}

export default BlogPost;
