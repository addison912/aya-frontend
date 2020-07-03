/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from "react";
import AdminContext from "../context/adminContext";

class AddGallery extends Component {
  static contextType = AdminContext;
  state = {
    name: "",
    order: "",
    thumb: ""
  };

  // componentDidMount() {
  //   console.log(this.context.category);
  // }

  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <figure
            className={
              context.addGallery == false
                ? "hover-cursor grid-image add-gallery"
                : "grid-image add-gallery"
            }
            role="button"
            onClick={
              context.addGallery == false
                ? () => context.toState({ addGallery: true, editPhoto: false })
                : null
            }
          >
            {/* {this.props.addGallery == false ? <h3>Add a New Photo +</h3> : null} */}
            <h3>Add a New Gallery +</h3>
            {context.addGallery == true ? (
              <form>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={this.state.name}
                  onChange={e =>
                    this.setState({
                      name: e.target.value
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
                <label htmlFor="thumbnailUpload">gallery thumbnail:</label>
                <input
                  id="thumbnailUpload"
                  type="file"
                  name="thumbnailUpload"
                  accept="image/png,image/jpeg"
                  onChange={e =>
                    this.setState({
                      thumb: e.target.files[0]
                    })
                  }
                />

                <div className="cancel-submit">
                  <input
                    type="button"
                    name="cancel"
                    className="cancel-button"
                    value="Cancel"
                    onClick={() => context.toState({ addGallery: false })}
                  />

                  <input
                    type="button"
                    name="submitPhoto"
                    className="submit-button"
                    value="Submit Gallery"
                    onClick={() =>
                      context.createGallery(this.state, this.context.category)
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

export default AddGallery;
