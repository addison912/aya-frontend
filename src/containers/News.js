import React, { Component } from "react";
import { domain } from "../config/constants";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";
import BlogPost from "../components/BlogPost";

class News extends Component {
  state = {
    news: []
  };

  getNews = () => {
    fetch(`${domain}/api/news/all`)
      .then(res => {
        return res.json();
      })
      .then(news => {
        console.log(news);
        this.setState({ news });
      });
  };
  componentDidMount() {
    this.getNews();
  }
  render() {
    return (
      <div className="main">
        <Logo className="logo" handleLogoClick={this.props.handleLogoClick} />
        <LeftNav
          categoryClickHandler={this.categoryClickHandler}
          selectedLink={"News"}
        />

        {/* {this.state.news.map((post, i) => {
            <BlogPost key={i} />;
            <span>-</span>;
          })} */}

        <div className="content">
          {this.state.news.map((post, i) => (
            <BlogPost key={i} post={post} />
          ))}
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
