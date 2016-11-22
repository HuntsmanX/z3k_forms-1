import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class InlineDropdownBlock extends Component {

  handleChange = (event) => {
    this.props.blockProps.field.toggleSelectedOption(event.target.value);
  }

  render() {
    const { field, onFocus, onBlur } = this.props.blockProps;

    const selected = field.availableOptions.find(o => o.isSelected);
    const value    = selected ? selected.uuid : "";

    return (
      <div className="inline-dropdown-wrapper">
        <select
          value={value}
          onChange={this.handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {field.availableOptions.map(option => {
            return (
              <option
                key={option.uuid}
                value={option.uuid}
                disabled={field.readOnly}
              >
                {option.content}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

}

export default InlineDropdownBlock;
