import React, { Component } from "react";
import AdminContext from "../context/adminContext";

class EditGallery extends Component {
  deleteGallery = id => {
    let confirmed = confirm(
      "Are you sure you want to delete this gallery? This will permanently delete the gallery and all photos contained within."
    );
  };
  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div className="editDelete">
            <button className="edit" onClick={this.props.galleryClick}>
              EDIT
            </button>
            <button
              className="delete"
              onClick={() => context.deleteGallery(this.props.gallery._id)}
            >
              DELETE
            </button>
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default EditGallery;
