import React, { Component } from "react";
import { observer } from "mobx-react";

import { Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "./../../../shared/icon";

import { dragSource, dropTarget } from "./../../../../helpers/sort-dnd";

@dropTarget("option")
@dragSource("option")
@observer
class Option extends Component {

  handleChange(attr, event) {
    this.props.option.set(attr, event.target.value);
  }

  handleKeyDown = (event) => {
    if (event.which === 13 || event.keyCode === 13)
      this.props.onEnterPress();
  }

  render() {
    const {
      option,
      index,
      hasCorrectOptions,
      toggleSelected,
      deleteOption,
      connectDragSource,
      connectDragPreview,
      isDragging,
      connectDropTarget
    } = this.props;

    const opacity = isDragging ? 0 : 1;
    const icon    = option.isCorrect ? 'done' : 'block';

    return connectDropTarget(
      <div className="row choice-option" style={{ opacity, display: 'flex' }}>

        <Column large={1}>
          <label className="middle text-right drag-handle">
            {connectDragSource(
              <i className="material-icons action drag-handle">dehaze</i>
            )}
          </label>
        </Column>

        {connectDragPreview(<div className="column large-8">
          <input
            type="text"
            value={option.content}
            onChange={this.handleChange.bind(this, 'content')}
            onKeyDown={this.handleKeyDown}
            placeholder={`Option ${index + 1}`}
            ref={option.assignInputRef.bind(option)}
          />
        </div>)}

        <Column large={3}>
          <label className="middle">
            {hasCorrectOptions ? (
              <Icon className="action" onClick={toggleSelected}>{icon}</Icon>
            ) : null}
            <Icon className="action" onClick={deleteOption}>delete</Icon>
          </label>
        </Column>

      </div>
    );
  }

}

export default Option;
