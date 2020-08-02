import React, { Component } from "react";
import { domain } from "../config/constants";
import BlogPost from "../components/BlogPost";
import NewsContext from "../context/newsContext";
import AddPost from "../components/AddPost";
import axios from "axios";
import EditPost from "../components/EditPost";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      show: 5,
      editPost: {},
      addPost: false,
      editPhoto: {},
      numDate: this.numDate,
      toState: this.toState,
      uploadPost: this.uploadPost,
      newsEdit: this.newsEdit,
      handlePostEdit: this.handlePostEdit,
      deletePhoto: this.deletePhoto,
      handlePhotoEditInputChange: this.handlePhotoEditInputChange
    };
  }

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

  toState = input => {
    this.setState(input);
  };

  numDate = date => {
    if (date.getFullYear() > 1970) {
      date = new Date(date.getTimezoneOffset() * 60000 + date.getTime());
      return `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1).toString()
          : (date.getMonth() + 1).toString()
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    }
  };

  stringDate = date => {
    const d = new Date(date);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let m = monthNames[d.getMonth()];
    return `${m} ${d.getDate()}, ${d.getFullYear()}`;
  };

  uploadPost = post => {
    let newPost = new FormData();
    newPost.append("title", post.title);
    newPost.append("date", this.stringDate(post.date));
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

    newPost.append("photoData", JSON.stringify(photoData));
    axios
      .post(`${domain}/api/news/post`, newPost, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.data) {
          if (res.data.title && res.data.date) {
            console.log(res.data);
            let news = this.state.news;
            news.push(res.data);
            news.sort(function(a, b) {
              return Date.parse(b.date) - Date.parse(a.date);
            });
            this.setState({ news, addPost: false });
          }
        }
      });
  };

  newsEdit = post => {
    let date = new Date(post.date);
    date = new Date(date.getTimezoneOffset() * 60000 + date.getTime());
    let updatedPost = new FormData();
    updatedPost.append("_id", post._id);
    updatedPost.append("title", post.title);
    updatedPost.append("date", this.stringDate(date));
    updatedPost.append("text", post.text);
    updatedPost.append("hideDate", post.hideDate ? post.hideDate : false);
    updatedPost.append("deletePhotos", JSON.stringify(post.deletePhotos));
    updatedPost.append("editPhotos", JSON.stringify(post.deletePhotos));
    if (post.newPhotos) {
      for (const key of Object.keys(post.newPhotos)) {
        updatedPost.append("newPhotos", post.newPhotos[key]);
      }
      let photoData = [];
      post.newPhotos.forEach(photo => {
        let newPhoto = {
          location: photo.name,
          caption: photo.caption,
          link: photo.photoLink
        };
        photoData.push(newPhoto);
      });
      updatedPost.append("photoData", JSON.stringify(photoData));
    }
    axios
      .post(`${domain}/api/news/edit`, updatedPost, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        if (res.data) {
          if (res.data.title && res.data.date) {
            console.log(res.data);
            let news = this.state.news;
            let i = news.indexOf(
              news.find(post => {
                return post._id == res.data._id;
              })
            );
            news.splice(i, 1, res.data);
            news.sort(function(a, b) {
              return Date.parse(b.date) - Date.parse(a.date);
            });
            this.setState({ news, addPost: false });
            this.setState({ editPost: {}, news });
          }
        }
      });
  };

  handlePostEdit = edits => {
    let editPost = this.state.editPost;
    for (let i = 0; i < Object.keys(edits).length; i++) {
      editPost[Object.keys(edits)[i]] = edits[Object.keys(edits)[i]];
    }
    this.setState({ editPost });
  };

  handlePhotoEditInputChange = (photo, key, newValue) => {
    this.state.editPost.photos.find(editPhoto => editPhoto == photo)[
      key
    ] = newValue;
  };

  deletePhoto = photo => {
    let editPost = this.state.editPost;
    if (photo._id) {
      if (!editPost.deletePhotos) {
        editPost.deletePhotos = [];
      }
      editPost.deletePhotos.push(photo);
    }
    let i = editPost.photos.indexOf(photo);
    editPost.photos.splice(i, 1);
    this.setState({ editPost });
  };

  deletePost = id => {
    try {
      console.log(`deleting: ${id}`);
      let d = confirm("Are you sure you want to delete this post?");
      if (d == true) {
        axios
          .delete(`${domain}/api/news/${id}`, {
            headers: {
              authorization: `bearer ${window.sessionStorage.ayaToken}`
            }
          })
          .then(response => {
            console.log("post deleted");
            let news = this.state.news;
            //remove post from state
            news.splice(
              news.indexOf(
                news.find(post => {
                  return post._id == id;
                })
              ),
              1
            );
            this.setState({ news });
          })
          .catch(error => {
            console.log(error.response);

            if (error.response.status == 403) {
              this.logout();
            }
          });
      } else {
        console.log("Deletion cancelled");
      }
    } catch (err) {
      console.log("Deletion Error: " + err);
    }
  };

  handleEditClick = post => {
    this.setState({ editPost: post, addPost: false });
    console.log(this.state.editPost);
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
                return post._id == this.state.editPost._id ? (
                  <EditPost key={post._id} />
                ) : (
                  <BlogPost
                    key={i}
                    post={post}
                    deletePost={this.deletePost}
                    handleEditClick={this.handleEditClick}
                  />
                );
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
