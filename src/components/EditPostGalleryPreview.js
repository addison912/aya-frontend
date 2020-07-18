/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { domain } from "../config/constants";
import NewsContext from "../context/newsContext";

export class EditPostGalleryPreview extends Component {
  static contextType = NewsContext;
  componentDidUpdate() {
    // console.log(this.props);
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

                {photo.caption ? (
                  <figcaption>{photo.caption}</figcaption>
                ) : null}

                <img
                  className="trash"
                  src={require("../assets/images/trash.png")}
                  alt="delete"
                  role="button"
                  onClick={() => context.deletePhoto(photo)}
                />
              </figure>
            ))}
          </div>
        )}
      </NewsContext.Consumer>
    );
  }
}

export default EditPostGalleryPreview;
