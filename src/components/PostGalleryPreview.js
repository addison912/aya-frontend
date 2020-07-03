import React, { Component } from "react";

export class PostGalleryPreview extends Component {
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="add-post-photos post-images">
        {this.props.photos.map((photo, i) => (
          <figure className="grid-image" key={i}>
            <img src={photo.preview} alt={photo.caption} />
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    );
  }
}

export default PostGalleryPreview;
