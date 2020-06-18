/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AddPhoto from "./AddPhoto";
import AdminContext from "../adminContext";
import Breadcrumb from "./Breadcrumb";
import DraggableGalleryItem from "./DraggableGalleryItem";
const update = require("immutability-helper");

class GalleryGrid extends Component {
  static contextType = AdminContext;
  componentDidMount() {
    console.log("gallery grid mounted");
    console.log(this.props);
  }

  moveItem = (dragIndex, hoverIndex) => {
    // console.log(dragIndex, hoverIndex);

    let gallery = this.context.gallery;
    if (gallery.photos) {
      const dragPhoto = gallery.photos[dragIndex];
      let arrangePhotos = update(gallery.photos, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragPhoto]
        ]
      });
      gallery.photos = arrangePhotos;
      this.context.toState({ gallery });
    }
  };

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
                  <DraggableGalleryItem
                    key={photo._id}
                    photo={photo}
                    category={this.props.category}
                    gallery={this.props.gallery}
                    photoClick={this.props.photoClick}
                    moveItem={this.moveItem}
                    photoEdit={this.context.photoEdit}
                    index={i}
                    id={photo._id}
                  />
                ))
              : null}
          </div>
        )}
      </AdminContext.Consumer>
    );
  }
}

export default GalleryGrid;
