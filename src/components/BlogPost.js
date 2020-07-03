import React, { Component } from "react";
import BlogTitle from "../components/BlogTitle";
import BlogDate from "../components/BlogDate";
import BlogArticle from "../components/BlogArticle";
import BlogImages from "../components/BlogImages";
import BlogEditButtons from "./BlogEditButtons";

class BlogPost extends Component {
  render() {
    return (
      <div
        className="news-post"
        id={this.props.post.title.replace(/[^A-Z0-9]/gi, "-").toLowerCase()}
      >
        <BlogEditButtons
          deletePost={this.props.deletePost}
          post={this.props.post}
        />
        <div className="post-text">
          {" "}
          <BlogTitle
            title={this.props.post.title}
            // copyLink={this.props.copyLink}
          />
          <BlogDate date={this.props.post.date} />
          <BlogArticle text={this.props.post.text} />
        </div>

        <BlogImages photos={this.props.post.photos} />
      </div>
    );
  }
}

export default BlogPost;
