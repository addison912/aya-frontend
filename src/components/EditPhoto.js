import React, { Component } from "react";
import AdminContext from "../adminContext";

class EditPhoto extends Component {
  static contextType = AdminContext;
  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div className="editDelete">
            <button className="edit">EDIT</button>
            <button
              className="delete"
              onClick={() => context.deletePhoto(this.props.photo._id)}
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
