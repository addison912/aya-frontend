/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import EditPhoto from "../components/EditPhoto";
import AddPhoto from "./AddPhoto";
import AdminContext from "../adminContext";
import Breadcrumb from "./Breadcrumb";

class GalleryGrid extends Component {
  static contextType = AdminContext;
  // componentDidMount() {
  //   // console.log("gallery grid mounted");
  //   // console.log(this.props);
  // }
  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div className="gallery-content">
            <Breadcrumb
              gallery={this.props.gallery}
              category={this.props.category}
              view={this.props.view}
            />
            {this.props.category != "Search" && context.category != "Search" ? (
              <AddPhoto
                gallery={this.props.gallery}
                category={this.props.category}
              />
            ) : null}

            {this.props.gallery && this.props.gallery.photos
              ? this.props.gallery.photos.map((photo, i) => (
                  <figure
                    className={
                      this.props.category == "Books"
                        ? "grid-image gallery-image book-image"
                        : "grid-image gallery-image"
                    }
                    key={photo.location}
                    role="button"
                    style={
                      photo.order
                        ? { order: photo.order }
                        : { order: this.props.gallery.photos.length + i }
                    }
                  >
                    <img
                      src={`${domain}/uploads/photos/${
                        photo.category.toLowerCase() == "advertising"
                          ? "Client-Work"
                          : photo.category.replace(/\/?\s+/g, "_")
                      }/${photo.gallery
                        .replace(/\/?\s+/g, "_")
                        .replace(/[^\w\s]/gi, "")}/thumbs/${photo.location}`}
                      alt={photo.caption}
                      className="gridImage"
                    />
                    <div className="item">
                      <figcaption>{photo.caption}</figcaption>
                      <EditPhoto
                        photo={photo}
                        photoClick={() => this.props.photoClick(i)}
                      />
                    </div>
                  </figure>
                ))
              : null}
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default GalleryGrid;
