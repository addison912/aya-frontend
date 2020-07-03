import React, { Component } from "react";
import { domain } from "../config/constants";
import BlogPost from "../components/BlogPost";
import NewsContext from "../context/newsContext";
import AddPost from "../components/AddPost";
import axios from "axios";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      show: 5,
      editPost: "",
      addPost: false,
      toState: this.toState,
      uploadPost: this.uploadPost
    };
  }

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

  toState = input => {
    this.setState(input);
  };

  numDate = date => {
    return `${date.getFullYear()}-${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  uploadPost = post => {
    let newPost = new FormData();
    newPost.append("title", post.title);
    newPost.append("date", post.date);
    newPost.append("text", post.text);
    for (const key of Object.keys(post.photos)) {
      newPost.append("photos", post.photos[key]);
    }
    let photoData = [];
    post.photos.forEach(photo => {
      let newPhoto = {
        location: photo.name,
        caption: photo.caption,
        link: photo.photoLink
      };
      photoData.push(newPhoto);
    });
    // console.log(photoData);
    // for (const key of Object.keys(photoData)) {
    //   newPost.append("photoData", photoData[key]);
    // }
    newPost.append("photoData", JSON.stringify(photoData));
    for (var value of newPost.values()) {
      console.log(value);
    }
    axios
      .post(`${domain}/api/news/post`, newPost, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.data) {
          this.setState({ gallery: res.data });
        }
      });
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
      <NewsContext.Provider value={this.state}>
        <div className="main">
          <div className="content">
            <AddPost numDate={this.numDate} />
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
      </NewsContext.Provider>
    );
  }
}

export default News;
