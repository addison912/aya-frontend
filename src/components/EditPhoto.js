import React, { Component } from "react";
import AdminContext from "../adminContext";

class EditPhoto extends Component {
  static contextType = AdminContext;
  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div className="editDelete">
            <button
              className="edit"
              onClick={
                context.editPhoto != this.props.photo._id
                  ? () =>
                      context.toState({
                        addPhoto: false,
                        editPhoto: this.props.photo._id
                      })
                  : null
              }
            >
              EDIT
            </button>
            <button
              className="delete"
              onClick={() =>
                context.deletePhoto(
                  this.props.photo._id,
                  this.props.photo.location
                )
              }
            >
              DELETE
            </button>
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default EditPhoto;
