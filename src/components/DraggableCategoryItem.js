/* eslint-disable react/no-find-dom-node */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import EditGallery from "./EditGallery";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { XYCoord } from "dnd-core";
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor
} from "react-dnd";
import flow from "lodash/flow";
import EditGalleryThumb from "./EditGalleryThumb";
import GalleryThumbnail from "./GalleryThumbnail";

let initialIndex = Number;

const itemSource = {
  beginDrag(props) {
    console.log("started dragging");
    initialIndex = props.index;
    return {
      id: props.id,
      index: props.index,
      gallery: props.gallery
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // Don't replace items with themselves
    if (monitor.getItem().index === initialIndex) {
      return;
    }
    // props.photoEdit(monitor.getItem().photo, {
    //   order: monitor.getItem().index + 1
    // });
    // console.log(
    //   `gallery: ${JSON.stringify(monitor.getItem().gallery)}, order: ${
    //     monitor.getItem().index
    //   }`
    // );
    props.reorderGallery();
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveItem(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

class DraggableCategoryItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveItem: PropTypes.func.isRequired,
    gallery: PropTypes.object.isRequired,
    galleryClick: PropTypes.func.isRequired,
    reorderGallery: PropTypes.func.isRequired,
    editGalleryThumb: PropTypes.object.isRequired,
    submitNewThumb: PropTypes.func.isRequired,
    setEditGalleryThumb: PropTypes.func.isRequired
  };

  render() {
    const {
      gallery,
      isDragging,
      index,
      galleryClick,
      connectDragSource,
      connectDropTarget,
      editGalleryThumb,
      setEditGalleryThumb,
      submitNewThumb
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          //   <AdminContext.Consumer>
          //     {context => (
          <div className={"gallery-grid-item"} style={{ opacity }}>
            <figure className="grid-image gallery-image" role="button">
              {gallery._id == editGalleryThumb._id ? (
                <EditGalleryThumb
                  gallery={gallery}
                  setEditGalleryThumb={setEditGalleryThumb}
                  submitNewThumb={submitNewThumb}
                />
              ) : (
                <GalleryThumbnail
                  gallery={gallery}
                  setEditGalleryThumb={setEditGalleryThumb}
                />
              )}

              <div className="item">
                <figcaption>{gallery.name}</figcaption>
                <EditGallery
                  gallery={gallery}
                  galleryClick={() => galleryClick(gallery)}
                />
              </div>
            </figure>
          </div>
          //     )}
          //   </AdminContext.Consumer>
        )
      )
    );
  }
}

export default flow(
  DragSource("gallery", itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("gallery", itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(DraggableCategoryItem);
