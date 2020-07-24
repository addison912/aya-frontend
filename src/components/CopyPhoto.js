/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from "react";
import AdminContext from "../context/adminContext";
import { domain } from "../config/constants";
import axios from "axios";

class CopyPhoto extends Component {
  static contextType = AdminContext;
  state = { galleries: {}, gallerySelect: "" };

  getAll = () => {
    fetch(`${domain}/api/gallery/all`)
      .then(res => {
        return res.json();
      })
      .then(galleries => {
        console.log(galleries);
        this.setState({
          galleries
        });
      });
  };

  handleSelectGallery = gallery => {
    console.log(gallery);
    this.setState({ gallerySelect: gallery });
  };

  componentDidMount() {
    this.getAll();
  }

  copyPhoto = () => {
    let photo = this.props.photo;
    let destinationGallery = this.state.gallerySelect;
    axios
      .post(
        `${domain}/api/photo/copy`,
        { photo, destinationGallery },
        {
          headers: {
            authorization: `bearer ${window.sessionStorage.ayaToken}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        if (res.data) {
          this.context.toState({
            addPhoto: false,
            editPhoto: false,
            copyPhoto: false
          });
        }
      });
  };

  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <figure
            className={"grid-image gallery-image copy-photo-form"}
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
            <div className="select-gallery">
              <label htmlFor="select-copy-gallery">
                Copy photo to gallery:{" "}
              </label>
              <select
                id="select-copy-gallery"
                name="gallery"
                value={this.state.gallerySelect}
                onChange={e => this.handleSelectGallery(e.target.value)}
              >
                <option value="" disabled>
                  select a gallery
                </option>
                {Object.keys(this.state.galleries).map(category => (
                  <optgroup label={category} key={category}>
                    {this.state.galleries[category].map(gallery => (
                      <option key={gallery.id} value={gallery.id}>
                        {gallery.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="cancel-submit">
              <input
                type="button"
                name="cancel"
                className="cancel-button"
                value="Cancel"
                onClick={() =>
                  context.toState({
                    addPhoto: false,
                    editPhoto: false,
                    copyPhoto: false
                  })
                }
              />

              <input
                type="button"
                name="copyPhoto"
                className="copy-button"
                value="Copy"
                onClick={() => this.copyPhoto()}
              />
            </div>
          </figure>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default CopyPhoto;
