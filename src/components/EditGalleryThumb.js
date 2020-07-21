/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from "react";
import { domain } from "../config/constants";

export class EditGalleryThumb extends Component {
  state = {
    photo: "",
    background: `url(${domain}/uploads/photos/${
      this.props.gallery.category.toLowerCase() == "advertising"
        ? "Client-Work"
        : this.props.gallery.category.replace(/\/?\s+/g, "_")
    }/${this.props.gallery.name
      .replace(/\/?\s+/g, "_")
      .replace(/[^\w\s]/gi, "")}/thumb.jpg?${Date.now()})`
  };

  handleThumbSelect = e => {
    console.log(e.target.value);
    let photo = e.target.value;
    let location = JSON.parse(photo).location;
    let background = `url(${domain}/uploads/photos/${
      this.props.gallery.category.toLowerCase() == "advertising"
        ? "Client-Work"
        : this.props.gallery.category.replace(/\/?\s+/g, "_")
    }/${this.props.gallery.name
      .replace(/\/?\s+/g, "_")
      .replace(/[^\w\s]/gi, "")}/${location})`;
    console.log(background);
    this.setState({ photo, background });
  };

  render() {
    return (
      <div
        className="editGalleryThumb"
        style={{
          backgroundImage: this.state.background,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        {this.props.newGalleryThumb ? (
          <img
            src={this.props.newGalleryThumb.preview}
            alt="gallery thumbnail"
          ></img>
        ) : (
          <div className="chooseGalleryThumb">
            <select
              name="gallery photos"
              value={this.state.photo}
              onChange={e => this.handleThumbSelect(e)}
            >
              <option value="" disabled>
                --- select a photo ---
              </option>
              {this.props.gallery.photos.map(photo => (
                <option value={JSON.stringify(photo)} key={photo._id}>
                  {photo.caption}
                </option>
              ))}
            </select>
            {/* <div className="or"> - OR - </div>
            <input type="file" /> */}
          </div>
        )}
        <div className="cancel-submit">
          <input
            type="button"
            name="cancel"
            className="cancel-button"
            value="Cancel"
            onClick={() => this.props.setEditGalleryThumb({})}
          />

          <input
            type="button"
            name="submitThumb"
            className="submit-button"
            value="Submit Change"
            onClick={() =>
              this.props.submitNewThumb(JSON.parse(this.state.photo))
            }
          />
        </div>
      </div>
    );
  }
}

export default EditGalleryThumb;
