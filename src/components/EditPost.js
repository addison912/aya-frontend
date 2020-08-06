/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import NewsContext from "../context/newsContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditAddPostPhoto from "../components/EditAddPostPhoto";
import EditPostGalleryPreview from "./EditPostGalleryPreview";

export class EditPost extends Component {
  static contextType = NewsContext;
  cancel = () => {
    this.context.toState({ editPost: {} });
  };
  render() {
    return (
      <NewsContext.Consumer>
        {context => (
          <figure className={"grid-image add-post"}>
            {/* {this.props.addPost == false ? <h3>Add a New Photo +</h3> : null} */}
            {context.editPost ? (
              <form>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={context.editPost.title}
                  onChange={e =>
                    context.handlePostEdit({
                      title: e.target.value
                    })
                  }
                ></input>
                <div className="editDate">
                  <input
                    type="date"
                    name="date"
                    value={context.numDate(new Date(context.editPost.date))}
                    onChange={e =>
                      context.handlePostEdit({
                        date: e.target.value
                      })
                    }
                  ></input>
                  <div className="hideDate">
                    <input
                      type="checkbox"
                      checked={
                        context.editPost.hideDate
                          ? context.editPost.hideDate
                          : false
                      }
                      onChange={e =>
                        context.handlePostEdit({
                          hideDate: e.target.checked
                        })
                      }
                    />
                    <span>hide date</span>
                  </div>
                </div>

                <ReactQuill
                  theme="snow"
                  defaultValue={context.editPost.text}
                  onChange={value => context.handlePostEdit({ text: value })}
                  modules={this.modules}
                  formats={this.formats}
                />
                {context.editPost.photos.length > 0 ? (
                  <EditPostGalleryPreview
                    photos={context.editPost.photos}
                    edit={true}
                  />
                ) : null}

                <EditAddPostPhoto
                  handlePostEdit={context.handlePostEdit}
                  addPhoto={context.editPost.addPhoto}
                  editPost={context.editPost}
                  //   submitPhoto={context.editAddPhoto}
                  //   length={context.editPost.photos.length}
                />

                {context.editPost.addPhoto == true ? null : (
                  <div className="hide-submit-container">
                    <div className="hidePost">
                      <input
                        type="checkbox"
                        checked={
                          context.editPost.hidePost
                            ? context.editPost.hidePost
                            : false
                        }
                        onChange={e =>
                          context.handlePostEdit({
                            hidePost: e.target.checked
                          })
                        }
                      />
                      <span>hide post</span>
                    </div>

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
                        name="submitPost"
                        className="submit-button"
                        value="Submit Changes"
                        onClick={() => context.newsEdit(context.editPost)}
                      />
                    </div>
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

export default EditPost;
