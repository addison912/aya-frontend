/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { domain } from "../config/constants";
import NewsContext from "../context/newsContext";
import PostPhotoEdit from "./PostPhotoEdit";

export class EditPostGalleryPreview extends Component {
  static contextType = NewsContext;

  componentDidUpdate() {
    // if(this.props.p){}
  }
  render() {
    return (
      <NewsContext.Consumer>
        {context => (
          <div className="add-post-photos post-images">
            {this.props.photos.map((photo, i) => (
              <figure className="grid-image" key={i}>
                {photo._id ? (
                  <img
                    src={`${domain}/uploads/news/${photo.location}`}
                    alt={photo.caption}
                  />
                ) : (
                  <img src={photo.preview} alt={photo.caption} />
                )}
                {/* {context.editPhoto == } */}
                {photo.caption && context.editPhoto._id != photo._id ? (
                  <figcaption>{photo.caption}</figcaption>
                ) : null}
                {context.editPhoto != {} && context.editPhoto == photo ? (
                  <PostPhotoEdit toState={context.toState} photo={photo} />
                ) : (
                  <div className="post-image-edit-icons">
                    <img
                      className="trash"
                      src={require("../assets/images/trash.png")}
                      alt="delete"
                      role="button"
                      onClick={() => context.deletePhoto(photo)}
                    />
                    <img
                      className="edit-icon"
                      src={require("../assets/images/edit.svg")}
                      alt="edit"
                      role="button"
                      onClick={() => context.toState({ editPhoto: photo })}
                    />
                  </div>
                )}
              </figure>
            ))}
          </div>
        )}
      </NewsContext.Consumer>
    );
  }
}

export default EditPostGalleryPreview;
