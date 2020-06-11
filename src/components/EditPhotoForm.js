/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from "react";
import AdminContext from "../adminContext";
import { domain } from "../config/constants";

class EditPhotoForm extends Component {
  static contextType = AdminContext;
  state = {
    caption: "",
    order: "",
    searchTags: ""
  };

  componentDidMount() {
    this.setState({
      caption: this.props.photo.caption,
      order: this.props.photo.order,
      searchTags: this.props.photo.searchTags
    });
    // this.setState(this.props.photo.order);
  }
  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <figure
            className={"grid-image gallery-image edit-photo-form"}
            key={this.props.photo._id}
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
                .replace(/[^\w\s]/gi, "")}/thumbs/${this.props.photo.location}`}
              alt={this.props.photo.caption}
              className="gridImage"
            />
            <form>
              <label htmlFor="edit-photo-caption">caption:</label>
              <input
                id="edit-photo-caption"
                type="text"
                placeholder="caption"
                name="caption"
                value={this.state.caption}
                onChange={e =>
                  this.setState({
                    caption: e.target.value
                  })
                }
              ></input>
              <label htmlFor="edit-photo-order">order:</label>
              <input
                id="edit-photo-order"
                type="number"
                placeholder="order"
                name="order"
                value={this.state.order}
                onChange={e =>
                  this.setState({
                    order: e.target.value
                  })
                }
              ></input>
              <label htmlFor="edit-photo-tags">search tags:</label>
              <input
                id="edit-photo-tags"
                type="text"
                placeholder="search tags"
                name="search tags"
                value={this.state.searchTags}
                onChange={e =>
                  this.setState({
                    searchTags: e.target.value
                  })
                }
              ></input>
            </form>
            <div className="cancel-submit">
              <input
                type="button"
                name="cancel"
                className="cancel-button"
                value="Cancel"
                onClick={() =>
                  context.toState({
                    addPhoto: false,
                    editPhoto: false
                  })
                }
              />

              <input
                type="button"
                name="submitPhoto"
                className="submit-button"
                value="Submit Photo"
                // onClick={() =>
                //   context.uploadPhoto(
                //     this.state,
                //     this.props.gallery.name,
                //     this.props.gallery.category,
                //     this.props.gallery._id
                //   )
                // }
                onClick={() => context.photoEdit(this.props.photo, this.state)}
              />
            </div>
          </figure>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default EditPhotoForm;
