/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import EditPhoto from "../components/EditPhoto";
import AdminContext from "../adminContext";
import EditPhotoForm from "./EditPhotoForm";

class DraggableGalleryItem extends Component {
  static contextType = AdminContext;
  // componentDidMount() {
  //   // console.log("gallery grid mounted");
  //   // console.log(this.props);
  // }

  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div key={this.props.photo._id} className={"gallery-grid-item"}>
            {context.editPhoto != this.props.photo._id ? (
              <figure
                className={"grid-image gallery-image"}
                role="button"
                style={
                  this.props.photo.order
                    ? { order: this.props.photo.order }
                    : { order: this.props.gallery.photos.length + this.props.i }
                }
              >
                <img
                  src={`${domain}/uploads/photos/${
                    this.props.photo.category.toLowerCase() == "advertising"
                      ? "Client-Work"
                      : this.props.photo.category.replace(/\/?\s+/g, "_")
                  }/${this.props.photo.gallery
                    .replace(/\/?\s+/g, "_")
                    .replace(/[^\w\s]/gi, "")}/thumbs/${
                    this.props.photo.location
                  }`}
                  alt={this.props.photo.caption}
                  className="gridImage"
                />
                <div className="item">
                  <figcaption>{this.props.photo.caption}</figcaption>
                  <EditPhoto
                    photo={this.props.photo}
                    photoClick={() => this.props.photoClick(this.props.i)}
                  />
                </div>
              </figure>
            ) : (
              <EditPhotoForm
                photo={this.props.photo}
                key={this.props.photo._id}
                gallery={this.props.gallery}
                category={this.props.category}
                i={this.props.i}
              />
            )}
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default DraggableGalleryItem;
