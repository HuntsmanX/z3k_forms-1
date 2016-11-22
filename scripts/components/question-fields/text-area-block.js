import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class TextAreaBlock extends Component {

  handleChange = (event) => {
    this.props.blockProps.field.setValue(event.target.value);
  }

  render() {
    const { field, onFocus, onBlur, placeholder } = this.props.blockProps;

    return (
      <textarea
        value={field.value}
        onChange={this.handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={field.readOnly}
      />
    );
  }

}

export default TextAreaBlock;
