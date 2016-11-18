import React, { Component } from "react";
import { observer } from "mobx-react";

import SequenceOption from "./sequence-block/sequence-option";

@observer
class SequenceBlock extends Component {

  render() {
    const { field, onChange, onFocus, onBlur } = this.props.blockProps;

    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <SequenceOption
              key={option.uuid}
              uuid={option.uuid}
              content={option.content}
              move={onChange}
              onBeginDrag={onFocus}
              onEndDrag={onBlur}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}

export default SequenceBlock;
