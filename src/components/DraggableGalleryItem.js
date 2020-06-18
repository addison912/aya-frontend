/* eslint-disable react/no-find-dom-node */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import { domain } from "../config/constants";
import EditPhoto from "../components/EditPhoto";
import AdminContext from "../adminContext";
import EditPhotoForm from "./EditPhotoForm";
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
    props.photoEdit(monitor.getItem().photo, {
      order: monitor.getItem().index + 1
    });
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

class DraggableGalleryItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    category: PropTypes.string.isRequired,
    moveItem: PropTypes.func.isRequired,
    gallery: PropTypes.object.isRequired,
    photoClick: PropTypes.func.isRequired,
    photo: PropTypes.object.isRequired
  };

  render() {
    const {
      photo,
      gallery,
      category,
      isDragging,
      index,
      photoClick,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className={"gallery-grid-item"} style={{ opacity }}>
            <AdminContext.Consumer>
              {context => (
                <div>
                  {context.editPhoto != photo._id ? (
                    <figure
                      className={"grid-image gallery-image"}
                      role="button"
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
                          photoClick={() => photoClick(index)}
                        />
                      </div>
                    </figure>
                  ) : (
                    <EditPhotoForm
                      style={{ opacity }}
                      photo={photo}
                      gallery={gallery}
                      category={category}
                      i={index}
                    />
                  )}
                </div>
              )}
            </AdminContext.Consumer>
          </div>
        )
      )
    );
  }
}

// export default DraggableGalleryItem;

export default flow(
  DragSource("photo", itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("photo", itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(DraggableGalleryItem);
