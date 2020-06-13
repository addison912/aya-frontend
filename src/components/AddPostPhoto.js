/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from "react";

class AddPostPhoto extends Component {
  state = {
    caption: "",
    order: "",
    photo: "",
    link: ""
  };

  render() {
    return (
      <figure
        className={
          this.props.addPhoto == false
            ? "hover-cursor grid-image add-post-photo"
            : "grid-image add-post-photo"
        }
        role="button"
        onClick={
          this.props.addPhoto == false
            ? () => this.props.toState({ addPhoto: true })
            : null
        }
      >
        {/* {this.props.addPhoto == false ? <h3>Add a New Photo +</h3> : null} */}
        <h3>Add a New Photo +</h3>
        {this.props.addPhoto == true ? (
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
              placeholder="photo link (optional)"
              name="photo-link"
              value={this.state.link}
              onChange={e =>
                this.setState({
                  link: e.target.value
                })
              }
            ></input>
            <div className="cancel-submit">
              <input
                type="button"
                name="cancel"
                className="cancel-button"
                value="Cancel"
                onClick={() => this.props.toState({ addPhoto: false })}
              />

              <input
                type="button"
                name="submitPhoto"
                className="submit-button"
                value="Submit Photo"
                onClick={() => console.log("Adding Photo")}
              />
            </div>
          </form>
        ) : null}
      </figure>
    );
  }
}

export default AddPostPhoto;
