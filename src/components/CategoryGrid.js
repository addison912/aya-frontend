/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import ImageSpacer from "./ImageSpacer";
import Breadcrumb from "./Breadcrumb";
import AdminContext from "../context/adminContext";
import AddGallery from "./AddGallery";
import DraggableCategoryItem from "./DraggableCategoryItem";
import axios from "axios";
import { domain } from "../config/constants";
const update = require("immutability-helper");

class CategoryGrid extends Component {
  static contextType = AdminContext;
  state = {
    editGalleryThumb: {}
  };

  setEditGalleryThumb = gallery => {
    console.log(gallery);
    this.setState({ editGalleryThumb: gallery });
  };

  submitNewThumb = photo => {
    axios
      .post(`${domain}/api/gallery/thumb`, photo, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`,
          "Content-Type": "application/json"
        }
      })
      .then(thumb => {
        console.log(thumb.data);
        this.setState({ editGalleryThumb: {} });
      });
  };

  moveItem = (dragIndex, hoverIndex) => {
    // console.log(dragIndex, hoverIndex);

    let galleries = this.context.galleries;
    if (galleries && galleries.length > 0) {
      const dragPhoto = galleries[dragIndex];
      let arrangeGalleries = update(galleries, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragPhoto]
        ]
      });
      galleries = arrangeGalleries;
      this.context.toState({ galleries });
    }
  };

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
              <DraggableCategoryItem
                key={gallery._id}
                index={i}
                gallery={gallery}
                galleryClick={this.props.galleryClick}
                id={gallery._id}
                moveItem={this.moveItem}
                reorderGallery={this.context.reorderGallery}
                editGalleryThumb={this.state.editGalleryThumb}
                setEditGalleryThumb={this.setEditGalleryThumb}
                submitNewThumb={this.submitNewThumb}
                // galleries={this.props.galleries}
              />
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
