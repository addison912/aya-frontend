import React, { Component, useState } from "react";
import { domain } from "../config/constants";
import BlogPost from "../components/BlogPost";

class News extends Component {
  state = {
    news: [],
    show: 5
  };

  getNews = () => {
    fetch(`${domain}/api/news/all`)
      .then(res => {
        return res.json();
      })
      .then(news => {
        news = news.sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        this.setState({ news });
      });
  };
  showMore = () => {
    let show = this.state.show + 5;
    this.setState({ show });
  };

  componentDidMount() {
    this.getNews();
    this.props.setLocation("News");
    if (this.props.postId) {
      let post = this.props.postId.toLowerCase();
      this.setState({ show: "all" });
      setTimeout(function() {
        window.scroll({
          top: document.getElementById(post)
            ? document.getElementById(post).offsetTop + 96
            : 0,
          left: 0
        });
      }, 1000);
    }
  }
  render() {
    return (
      <div className="main">
        <div className="content">
          {this.state.news.map((post, i) => {
            if (this.state.show == "all" || i < this.state.show)
              return <BlogPost key={i} post={post} />;
          })}
          {this.state.show != "all" &&
          this.state.show < this.state.news.length ? (
            <div id="show-more-container">
              <button id="show-more" onClick={this.showMore}>
                Show More
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default News;
