import React, { Component } from "react";
import { observer } from "mobx-react";

import FieldExpand from "./field-expand";

@observer
class TextInputBlock extends Component {

  handleChange = (event) => {
    this.props.blockProps.field.setValue(event.target.value);
  }

  render() {
    const { field, onFocus, onBlur, placeholder } = this.props.blockProps;

    return (
      <div>
        <input
          type="text"
          value={field.value}
          onChange={this.handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={field.readOnly}
        />

        <FieldExpand field={field}>
          <input
            type="text"
            readOnly
            defaultValue={field.content}
          />
        </FieldExpand>
      </div>
    );
  }

}

export default TextInputBlock;
