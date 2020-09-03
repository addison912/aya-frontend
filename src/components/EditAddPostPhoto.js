/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from "react";
import NewsContext from "../context/newsContext";

class EditAddPostPhoto extends Component {
  static contextType = NewsContext;
  state = {
    caption: "",
    // order: this.props.length + 1,
    photo: "",
    link: "",
    preview: ""
  };

  submitPhoto = () => {
    console.log("submitting photo");
    if (this.state.photo) {
      let newPhoto = this.state.photo;
      newPhoto.caption = this.state.caption;
      newPhoto.photoLink = this.state.link;
      newPhoto.preview = this.state.preview;
      newPhoto._id = Math.random()
        .toString(36)
        .substring(2, 8);
      let photos = this.props.editPost.photos;
      photos.push(newPhoto);
      let newPhotos = this.props.editPost.newPhotos
        ? this.props.editPost.newPhotos
        : [];
      newPhotos.push(newPhoto);
      this.props.handlePostEdit({
        newPhotos,
        photos,
        addPhoto: false
      });
      this.setState({ caption: "", link: "", photo: "", preview: "" });
    } else {
      alert("Please select a photo");
    }
  };

  cancel = () => {
    console.log("cancel clicked");
    this.props.handlePostEdit({
      addPhoto: false
    });
    this.setState({
      caption: "",
      photo: "",
      link: "",
      preview: ""
    });
  };

  componentDidMount() {
    console.log("EditAddPostPhoto mounted");
  }

  render() {
    return (
      <NewsContext.Consumer>
        {context => (
          <div
            className={
              !this.props.addPhoto
                ? "hover-cursor add-post-photo"
                : "add-post-photo"
            }
            role="button"
            onClick={
              !this.props.addPhoto
                ? () => this.props.handlePostEdit({ addPhoto: true })
                : null
            }
          >
            {/* {this.props.addPhoto == false ? <h3>Add a New Photo +</h3> : null} */}
            <h3>Add a New Photo +</h3>
            {this.props.addPhoto == true ? (
              <div>
                {/* <input
              type="number"
              placeholder="order"
              name="order"
              value={this.state.order}
              onChange={e =>
                this.setState({
                  order: e.target.value
                })
              }
            ></input> */}

                <input
                  id="imageUpload"
                  type="file"
                  name="photoUpload"
                  accept="image/png,image/jpeg"
                  onChange={e =>
                    this.setState({
                      photo: e.target.files[0],
                      preview: URL.createObjectURL(e.target.files[0])
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="caption (optional)"
                  name="caption (optional)"
                  value={this.state.caption}
                  onChange={e =>
                    this.setState({
                      caption: e.target.value
                    })
                  }
                ></input>
                {/* <input
                  type="text"
                  placeholder="photo link (optional)"
                  name="photo-link"
                  value={this.state.link}
                  onChange={e =>
                    this.setState({
                      link: e.target.value
                    })
                  }
                ></input> */}
                <div className="cancel-submit">
                  <input
                    type="button"
                    name="cancel"
                    className="cancel-button"
                    value="Cancel"
                    onClick={this.cancel}
                  />

                  <input
                    type="button"
                    name="submitPhoto"
                    className="submit-button"
                    value="Add Photo"
                    onClick={() => this.submitPhoto()}
                  />
                </div>
              </div>
            ) : null}
          </div>
        )}
      </NewsContext.Consumer>
    );
  }
}

export default EditAddPostPhoto;
