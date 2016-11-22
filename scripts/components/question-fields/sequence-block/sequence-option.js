import React, { Component } from "react";
import { observer } from "mobx-react";

import { dragSource, dropTarget } from "./../../../helpers/sort-dnd";

@dropTarget("sequence-option")
@dragSource("sequence-option")
@observer
class SequenceOption extends Component {

  render() {
    const {
      uuid,
      content,
      connectDragSource,
      connectDragPreview,
      isDragging,
      connectDropTarget
    } = this.props;

    const opacity = isDragging ? 0 : 1;

    return connectDropTarget(
      connectDragPreview(
        <label className="sequence-option" style={{ opacity }}>
          {connectDragSource(<i className="material-icons">dehaze</i>)}
          {content}
        </label>
      )
    );
  }

}

export default SequenceOption;
