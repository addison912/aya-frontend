import React, { Component } from "react";
import NewsContext from "../context/newsContext";

export class PostPhotoEdit extends Component {
  static contextType = NewsContext;
  state = {
    caption: "",
    link: ""
  };

  // submitPhotoEdit = () => {
  //   if (this.props.photo._id) {
  //     // console.log(this.props.photo);
  //     let editPost = this.context.editPost;
  //     let photo = editPost.photos.find(photo => {
  //       return photo._id == this.props.photo._id;
  //     });
  //     // console.log(photo);
  //     photo.caption = this.state.caption;
  //     photo.link = this.state.link;
  //     if (!editPost.editPhotos) {
  //       editPost.editPhotos = [photo];
  //       console.log(editPost.editPhotos);
  //     } else if (
  //       editPost.editPhotos.find(photo => {
  //         return photo._id == this.props.photo._id;
  //       })
  //     ) {
  //       console.log(editPost.editPhotos);
  //     } else {
  //       editPost.editPhotos.push(photo);
  //       console.log(editPost.editPhotos);
  //     }
  //     this.context.toState({ editPhoto: {}, editPost });
  //   }
  //   // let photo = this.props.photo;
  //   // photo.caption = this.state.caption;
  //   // photo.link = this.state.link;
  // };

  // submitPhotoEdit = () => {
  //   let editPost = this.context.editPost;
  //   let photo = editPost.photos.find(photo => {
  //     return photo == this.props.photo;
  //   });
  //   photo = Object.assign(photo, this.state);
  //   console.log(photo);

  //   this.context.toState({ editPhoto: {}, editPost });
  //   console.log(this.context.editPost);
  // };

  componentDidMount() {
    // this.setState({
    //   caption: this.props.photo.caption,
    //   link: this.props.photo.link
    // });
  }

  render() {
    return (
      <NewsContext.Consumer>
        {context => (
          <div className="postPhotoEdit">
            <input
              type="text"
              name="caption"
              value={this.props.photo.caption}
              placeholder={"caption (optional)"}
              onChange={e =>
                this.context.handlePhotoEditInputChange(
                  this.props.photo,
                  "caption",
                  e.target.value
                )
              }
            ></input>
            <input
              type="text"
              placeholder={"photo link (optional)"}
              name="photo-link"
              value={this.props.photo.link}
              onChange={e =>
                this.context.handlePhotoEditInputChange(
                  this.props.photo,
                  "link",
                  e.target.value
                )
              }
            ></input>
            <div className="cancel-submit">
              <input
                type="button"
                name="cancel"
                className="cancel-button"
                value="Cancel"
                onClick={() => this.props.toState({ editPhoto: {} })}
              />

              <input
                type="button"
                name="submitPhoto"
                className="submit-button"
                value="Submit Change"
                onClick={() => this.submitPhotoEdit()}
              />
            </div>
          </div>
        )}
      </NewsContext.Consumer>
    );
  }
}

export default PostPhotoEdit;
