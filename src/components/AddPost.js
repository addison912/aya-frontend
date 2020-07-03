/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from "react";
import NewsContext from "../context/newsContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddPostPhoto from "../components/AddPostPhoto";
import PostGalleryPreview from "./PostGalleryPreview";

class AddPhoto extends Component {
  static contextType = NewsContext;
  state = {
    title: "",
    date: this.props.numDate(new Date()),
    text: "",
    photos: [],
    addPhoto: false
  };

  modules = {
    toolbar: [["bold", "italic", "underline"], ["link"]]
  };
  formats = ["bold", "italic", "underline", "list", "bullet", "link"];

  toState = input => {
    this.setState(input);
  };

  render() {
    return (
      <NewsContext.Consumer>
        {context => (
          <figure
            className={
              context.addPost == false
                ? "hover-cursor grid-image add-post"
                : "grid-image add-post"
            }
            role="button"
            onClick={
              context.addPost == false
                ? () => context.toState({ addPost: true, editPhoto: false })
                : null
            }
          >
            {/* {this.props.addPost == false ? <h3>Add a New Photo +</h3> : null} */}
            <h3>Add a Post + (under construction)</h3>
            {context.addPost == true ? (
              <form>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={e =>
                    this.setState({
                      title: e.target.value
                    })
                  }
                ></input>
                <input
                  type="date"
                  name="date"
                  value={this.state.date}
                  onChange={e =>
                    this.setState({
                      date: e.target.value
                    })
                  }
                ></input>

                <ReactQuill
                  theme="snow"
                  defaultValue={context.contact}
                  onChange={value => this.setState({ text: value })}
                  modules={this.modules}
                  formats={this.formats}
                />
                {this.state.photos.length > 0 ? (
                  <PostGalleryPreview photos={this.state.photos} />
                ) : null}

                <AddPostPhoto
                  addPhoto={this.state.addPhoto}
                  toState={this.toState}
                  photos={this.state.photos}
                  submitPhoto={this.submitPhoto}
                  length={this.state.photos.length}
                />

                {this.state.addPhoto == true ? null : (
                  <div className="cancel-submit">
                    <input
                      type="button"
                      name="cancel"
                      className="cancel-button"
                      value="Cancel"
                      onClick={() => context.toState({ addPost: false })}
                    />

                    <input
                      type="button"
                      name="submitPost"
                      className="submit-button"
                      value="Submit Post"
                      onClick={() => context.uploadPost(this.state)}
                    />
                  </div>
                )}
              </form>
            ) : null}
          </figure>
        )}
      </NewsContext.Consumer>
    );
  }
}

export default AddPhoto;
