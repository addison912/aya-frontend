import React, { Component } from "react";

export class PostGalleryPreview extends Component {
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="add-post-photos">
        {this.props.photos.map((photo, i) => (
          <div className="addPostPhoto" key={i}>
            <img
              src={photo.preview}
              alt={photo.caption}
              style={{ width: "33.33%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default PostGalleryPreview;
