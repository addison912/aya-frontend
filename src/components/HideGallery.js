import React, { Component } from "react";
import AdminContext from "../context/adminContext";

export class HideGallery extends Component {
  static contextType = AdminContext;

  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div className="hideGallery">
            <input
              type="checkbox"
              checked={context.gallery.hideGallery}
              onChange={e =>
                context.hideGallery(this.props.gallery, e.target.checked)
              }
            />
            <span>hide gallery</span>
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default HideGallery;
