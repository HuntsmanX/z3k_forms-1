import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";

const _dragSource = {
  beginDrag(props) {
    props.onBeginDrag && props.onBeginDrag();

    return {
      index: props.index,
      uuid:  props.uuid
    };
  },

  endDrag(props) {
    props.onEndDrag && props.onEndDrag();
  }
};

export const dragSource = DragSource('option', _dragSource, (connect, monitor) => ({
  connectDragSource:  connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging:         monitor.isDragging()
}));

const _dropTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) return;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

    // Time to actually perform the action
    const dragId  = monitor.getItem().uuid;
    const hoverId = props.uuid;

    props.move(dragId, hoverId);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

export const dropTarget = DropTarget('option', _dropTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}));
