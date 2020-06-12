/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import ImageSpacer from "./ImageSpacer";
import EditGallery from "./EditGallery";
import Breadcrumb from "./Breadcrumb";
import AdminContext from "../adminContext";
import AddGallery from "./AddGallery";

class CategoryGrid extends Component {
  static contextType = AdminContext;
  render() {
    return (
      <AdminContext.Consumer>
        {context => (
          <div className="gallery-content">
            <Breadcrumb category={this.props.category} view={this.props.view} />
            {this.props.category != "Search" && context.category != "Search" ? (
              <AddGallery />
            ) : null}
            {this.props.galleries.map((gallery, i) => (
              <figure
                key={i}
                className="grid-image gallery-image"
                role="button"
                style={{
                  order: gallery.order
                    ? gallery.order
                    : this.props.galleries.length
                }}
              >
                <img
                  src={`${domain}/uploads/photos/${
                    gallery.category.toLowerCase() == "advertising"
                      ? "Client-Work"
                      : gallery.category.replace(/\/?\s+/g, "_")
                  }/${gallery.name
                    .replace(/\/?\s+/g, "_")
                    .replace(/[^\w\s]/gi, "")}/thumb.jpg`}
                  alt={
                    gallery.photos &&
                    gallery.photos[0] &&
                    gallery.photos[0].caption
                      ? gallery.photos[0].caption
                      : null
                  }
                  className="gridImage"
                />

                <div className="item">
                  <figcaption>{gallery.name}</figcaption>
                  <EditGallery
                    gallery={gallery}
                    galleryClick={() => this.props.galleryClick(gallery)}
                  />
                </div>
              </figure>
            ))}
            <ImageSpacer />
            <ImageSpacer />
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default CategoryGrid;
