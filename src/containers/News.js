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
          return Date.parse(a.date) + Date.parse(b.date);
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
  }
  render() {
    return (
      <div className="main">
        <div className="content">
          {this.state.news.map((post, i) => {
            if (i < this.state.show) return <BlogPost key={i} post={post} />;
          })}
          {this.state.show < this.state.news.length ? (
            <div id="show-more-container">
              <button id="show-more" onClick={this.showMore}>
                Show More
              </button>
            </div>
          ) : null}
        </div>
        {/* <div className="content">
          <div className="page-container">
            <h1>News, Coming Soon!</h1>
          </div>
        </div> */}
      </div>
    );
  }
}

export default News;
