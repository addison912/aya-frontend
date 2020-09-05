import React, { Component } from "react";
import { domain } from "../config/constants";
import BlogPost from "../components/BlogPost";
import NewsContext from "../context/newsContext";
import AddPost from "../components/AddPost";
import axios from "axios";
import EditPost from "../components/EditPost";
import update from "immutability-helper";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      show: 5,
      editPost: {},
      addPost: false,
      editPhoto: {},
      reordered: false,
      numDate: this.numDate,
      toState: this.toState,
      uploadPost: this.uploadPost,
      newsEdit: this.newsEdit,
      handlePostEdit: this.handlePostEdit,
      deletePhoto: this.deletePhoto,
      handlePhotoEditInputChange: this.handlePhotoEditInputChange,
      cancelPhotoEdit: this.cancelPhotoEdit,
      submitPhotoEdit: this.submitPhotoEdit,
      reorderPhotos: this.reorderPhotos
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
        news = this.sortNewsPhotos(news);
        this.setState({ news });
      });
  };

  sortNewsPhotos = news => {
    news.forEach(post => {
      post.photos = this.sortPostPhotos(post);
    });
    return news;
  };

  sortPostPhotos = post => {
    if (post.photos && post.photos.length > 1) {
      for (let i = 0; i < post.photos.length; i++) {
        if (!post.photos[i].order) {
          post.photos[i].order = post.photos.length + i;
        }
      }
      post.photos = post.photos.sort(function(a, b) {
        return a.order - b.order;
      });
      for (let i = 0; i < post.photos.length; i++) {
        post.photos[i].order = i + 1;
      }
    }
    return post.photos;
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
    newPost.append("hideDate", post.hideDate ? post.hideDate : false);
    newPost.append("hidePost", post.hidePost ? post.hidePost : false);
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
    // if (this.state.reorderPhotos == true) {
    //   let photos = this.state.editPost.photos;
    //   photos.forEach(photo => {
    //     this.updateStagedPhoto(photo);
    //   });
    // }
    let date = new Date(post.date);
    date = new Date(date.getTimezoneOffset() * 60000 + date.getTime());
    let updatedPost = new FormData();
    updatedPost.append("_id", post._id);
    updatedPost.append("title", post.title);
    updatedPost.append("date", this.stringDate(date));
    updatedPost.append("text", post.text);
    updatedPost.append("hideDate", post.hideDate ? post.hideDate : false);
    updatedPost.append("hidePost", post.hidePost ? post.hidePost : false);
    updatedPost.append("deletePhotos", JSON.stringify(post.deletePhotos));
    updatedPost.append("editPhotos", JSON.stringify(post.editPhotos));
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
    let editPost = {};
    Object.assign(editPost, this.state.editPost);
    for (let i = 0; i < Object.keys(edits).length; i++) {
      editPost[Object.keys(edits)[i]] = edits[Object.keys(edits)[i]];
    }
    this.setState({ editPost });
  };

  handlePhotoEditInputChange = (photo, key, newValue) => {
    let editPhoto = {};
    Object.assign(editPhoto, this.state.editPhoto);
    editPhoto[key] = newValue;
    this.setState({ editPhoto });
  };

  reorderPhotos = () => {
    console.log("reordering photos");
    console.log(this.state.editPost.photos);
    let editPost = {};
    Object.assign(editPost, this.state.editPost);
    for (let i = 0; i < editPost.photos.length; i++) {
      editPost.photos[i].order = i + 1;
      if (
        editPost.newPhotos &&
        editPost.newPhotos.find(photo => photo._id == editPost.photos[i]._id)
      ) {
        editPost.newPhotos.find(
          photo => photo._id == editPost.photos[i]._id
        ).order = i + 1;
      } else if (
        editPost.editPhotos &&
        editPost.editPhotos.find(photo => photo._id == editPost.photos[i]._id)
      ) {
        editPost.editPhotos.find(
          photo => photo._id == editPost.photos[i]._id
        ).order = i + 1;
      } else if (!editPost.editPhotos) {
        editPost.editPhotos = [editPost.photos[i]];
      } else {
        editPost.editPhotos.push(editPost.photos[i]);
      }
    }

    this.setState({ editPost, reordered: true });
  };

  submitPhotoEdit = editPhoto => {
    let editPost = {};
    Object.assign(editPost, this.state.editPost);

    let editPhotoIndex = editPost.photos.indexOf(
      editPost.photos.find(photo => photo._id == editPhoto._id)
    );
    editPost.photos.splice(editPhotoIndex, 1, editPhoto);

    this.updateStagedPhoto(editPhoto);
  };

  updateStagedPhoto = editPhoto => {
    let editPost = {};
    Object.assign(editPost, this.state.editPost);
    if (
      !!editPost.newPhotos &&
      editPost.newPhotos.find(photo => photo._id == editPhoto._id)
    ) {
      Object.assign(
        editPost.newPhotos.find(photo => photo._id == photo._id),
        editPhoto
      );
    } else if (
      !!editPost.editPhotos &&
      editPost.editPhotos.find(photo => photo._id == editPhoto._id)
    ) {
      Object.assign(
        editPost.editPhotos.find(photo => photo._id == photo._id),
        editPhoto
      );
    } else if (editPost.editPhotos) {
      editPost.editPhotos.push(editPhoto);
    } else {
      editPost.editPhotos = [editPhoto];
    }
    this.setState({ editPost, editPhoto: {} });
  };

  cancelPhotoEdit = photo => {
    let editPost = {};
    Object.assign(editPost, this.state.editPost);
    editPost.photos.find(
      editPhoto => editPhoto._id == photo._id
    ).caption = this.state.news
      .find(post => post._id == editPost._id)
      .photos.find(editPhoto => editPhoto._id == photo._id).caption;
    this.setState({ editPost, editPhoto: {} });
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
    let editPost = {};
    Object.assign(editPost, post);
    editPost.photos = [];
    post.photos.forEach(photo => {
      let newPhoto = {};
      Object.assign(newPhoto, photo);
      editPost.photos.push(newPhoto);
    });
    this.setState({ editPost, addPost: false });
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
