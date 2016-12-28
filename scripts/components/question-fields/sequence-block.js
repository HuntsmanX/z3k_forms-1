import React, { Component } from "react";
import { observer } from "mobx-react";

import SequenceOption from "./sequence-block/sequence-option";

import FieldExpand from "./field-expand";

@observer
class SequenceBlock extends Component {

  moveOption = (...args) => {
    const { field } = this.props.blockProps;
    if (field.readOnly) return;
    field.moveOption(...args);
  }

  render() {
    const { field, onFocus, onBlur } = this.props.blockProps;

    return (
      <div>
        <div className="box-inputs" className={field.highlighting} onMouseOver={field.setHighlight.bind(field)} onMouseLeave={field.removeHiglight.bind(field)}>
          {field.availableOptions.map((option, index) => {
            return (
              <SequenceOption
                key={option.uuid}
                uuid={option.uuid}
                content={option.content}
                move={this.moveOption}
                onBeginDrag={onFocus}
                onEndDrag={onBlur}
                index={index}
              />
            );
          })}
        </div>

        <FieldExpand field={field}>
          <div className="box-inputs">
            {(field.correctlyOrderedOptions || []).map((option, index) => {
              return (
                <SequenceOption
                  key={option.uuid}
                  uuid={option.uuid}
                  content={option.content}
                  move={this.moveOption}
                  onBeginDrag={onFocus}
                  onEndDrag={onBlur}
                  index={index}
                />
              );
            })}
          </div>
        </FieldExpand>
      </div>
    );
  }
}

export default SequenceBlock;
