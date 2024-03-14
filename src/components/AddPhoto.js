/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from "react";
import AdminContext from "../context/adminContext";

class AddPhoto extends Component {
  static contextType = AdminContext;
  state = {
    caption: "",
    order: 1,
    photo: "",
    searchTags: ""
  };

  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <figure
            className={
              context.addPhoto == false
                ? "hover-cursor grid-image add-photo"
                : "grid-image add-photo"
            }
            role="button"
            onClick={
              context.addPhoto == false
                ? () => context.toState({ addPhoto: true, editPhoto: false })
                : null
            }
          >
            {/* {this.props.addPhoto == false ? <h3>Add a New Photo +</h3> : null} */}
            <h3>Add a New Photo +</h3>
            {context.addPhoto == true ? (
              <form>
                <input
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
                <input
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

                <input
                  id="imageUpload"
                  type="file"
                  name="photoUpload"
                  accept="image/png,image/jpeg"
                  onChange={e =>
                    this.setState({
                      photo: e.target.files[0]
                    })
                  }
                />

                <input
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
                <div className="cancel-submit">
                  <input
                    type="button"
                    name="cancel"
                    className="cancel-button"
                    value="Cancel"
                    onClick={() => context.toState({ addPhoto: false })}
                  />

                  <input
                    type="button"
                    name="submitPhoto"
                    className="submit-button"
                    value="Submit Photo"
                    onClick={() =>
                      context.uploadPhoto(
                        this.state,
                        this.props.gallery.name,
                        this.props.gallery.category,
                        this.props.gallery._id
                      )
                    }
                  />
                </div>
              </form>
            ) : null}
          </figure>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default AddPhoto;
