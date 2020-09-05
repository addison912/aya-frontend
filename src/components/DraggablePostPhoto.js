/* eslint-disable react/no-find-dom-node */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import NewsContext from "../context/newsContext";
import PostPhotoEdit from "./PostPhotoEdit";
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

let initialIndex = Number;

const itemSource = {
  beginDrag(props) {
    console.log("started dragging");
    initialIndex = props.index;
    return {
      id: props.id,
      index: props.index,
      photo: props.photo
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
    props.reorderPhotos();
    console.log(
      `photo: ${JSON.stringify(monitor.getItem().photo)}, order: ${
        monitor.getItem().index
      }`
    );
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
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    props.moveItem(dragIndex, hoverIndex);
    // props.reorderPhotos(monitor.getItem().photo, monitor.getItem().index);
    monitor.getItem().index = hoverIndex;
  }
};

class DraggablePostPhoto extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    reorderPhotos: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    photo: PropTypes.object.isRequired
  };

  render() {
    const {
      photo,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      <NewsContext.Consumer>
        {context =>
          connectDragSource &&
          connectDropTarget &&
          connectDragSource(
            connectDropTarget(
              <figure className="grid-image" style={{ opacity }}>
                {photo.preview ? (
                  <img src={photo.preview} alt={photo.caption} />
                ) : (
                  <img
                    src={`${domain}/uploads/news/${photo.location}`}
                    alt={photo.caption}
                  />
                )}
                {/* {context.editPhoto == } */}
                {photo.caption && context.editPhoto._id != photo._id ? (
                  <figcaption>{photo.caption}</figcaption>
                ) : null}
                {context.editPhoto != {} &&
                context.editPhoto._id == photo._id ? (
                  <PostPhotoEdit toState={context.toState} photo={photo} />
                ) : (
                  <div className="post-image-edit-icons">
                    <img
                      className="trash"
                      src={require("../assets/images/trash.png")}
                      alt="delete"
                      role="button"
                      onClick={() => context.deletePhoto(photo)}
                    />
                    <img
                      className="edit-icon"
                      src={require("../assets/images/edit.svg")}
                      alt="edit"
                      role="button"
                      onClick={() => context.toState({ editPhoto: photo })}
                    />
                  </div>
                )}
              </figure>
            )
          )
        }
      </NewsContext.Consumer>
    );
  }
}

export default flow(
  DragSource("photo", itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("photo", itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(DraggablePostPhoto);
