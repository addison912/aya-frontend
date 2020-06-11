/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AdminContext from "../adminContext";

class Breadcrumb extends Component {
  static contextType = AdminContext;

  componentDidMount() {
    this.context.toState({
      galleryName: "",
      editgalleryName: false
    });
  }
  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div className={"breadcrumb"}>
            {!!this.props.category &&
            this.props.category != "Search" &&
            this.props.view == "category" ? (
              <span>{this.props.category.replace("-", " ").toUpperCase()}</span>
            ) : null}
            {this.props.view == "gallery" &&
            !!this.props.category &&
            this.props.category != "Search" &&
            !!this.props.gallery &&
            !!this.props.gallery.name &&
            !context.editgalleryName ? (
              this.props.category.replace("-", " ").toUpperCase() ==
              this.props.gallery.name.toUpperCase() ? (
                <span>
                  {this.props.category.replace("-", " ").toUpperCase()}
                </span>
              ) : (
                <span>
                  <span style={{ after: require("../assets/images/edit.svg") }}>
                    {this.props.category.replace("-", " ").toUpperCase() +
                      " > " +
                      this.props.gallery.name.toUpperCase() +
                      " "}
                  </span>
                  <span>
                    <img
                      className="edit-icon"
                      src={require("../assets/images/edit.svg")}
                      alt="edit"
                      onClick={() =>
                        context.toState({
                          editgalleryName: true,
                          galleryName: this.props.gallery.name
                        })
                      }
                    />
                  </span>
                </span>
              )
            ) : this.props.view == "gallery" &&
              !!this.props.category &&
              this.props.category != "Search" &&
              !!this.props.gallery &&
              !!this.props.gallery.name &&
              !!context.editgalleryName &&
              this.props.category.replace("-", " ").toUpperCase() !=
                this.props.gallery.name.toUpperCase() ? (
              <span>
                <span>
                  {this.props.category.replace("-", " ").toUpperCase() + " > "}
                </span>
                <input
                  className="edit-gallery-name"
                  type="text"
                  name="gallery-name"
                  value={context.galleryName}
                  onChange={e =>
                    context.toState({ galleryName: e.target.value })
                  }
                ></input>
                <span className="cancel-submit">
                  <input
                    type="button"
                    name="gallery-name-cancel"
                    className="cancel-button"
                    value="Cancel"
                    onClick={() => context.toState({ editgalleryName: false })}
                  />

                  <input
                    type="button"
                    name="submitPhoto"
                    className="submit-button"
                    value="Submit"
                    onClick={() =>
                      context.updateGalleryName(
                        context.galleryName,
                        this.props.gallery._id,
                        this.props.category
                      )
                    }
                  />
                </span>
              </span>
            ) : this.props.view == "gallery" &&
              !!this.props.category &&
              this.props.category != "Search" &&
              !!this.props.gallery &&
              !!this.props.gallery.name &&
              !!context.editgalleryName &&
              this.props.category.replace("-", " ").toUpperCase() ==
                this.props.gallery.name.toUpperCase() ? (
              <span>{this.props.category.replace("-", " ").toUpperCase()}</span>
            ) : null}
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default Breadcrumb;
