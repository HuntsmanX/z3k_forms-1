import React, { Component } from "react";
import { observer } from "mobx-react";

import FieldExpand from "./field-expand";

@observer
class InlineDropdownBlock extends Component {

  handleChange = (event) => {
    this.props.blockProps.field.toggleSelectedOption(event.target.value);
  }

  render() {
    const { field, onFocus, onBlur } = this.props.blockProps;

    const selected = field.availableOptions.find(o => o.isSelected);
    const value    = selected ? selected.uuid : "";

    const correct    = field.availableOptions.find(o => o.isCorrect);
    const correctVal = correct ? correct.uuid : "";

    return (
      <span className={field.highlighting} onMouseOver={field.setHighlight.bind(field)} onMouseLeave={field.removeHiglight.bind(field)}>
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

        <FieldExpand field={field} type="inline">
          <div className="inline-dropdown-wrapper">
            <select defaultValue={correctVal}>
              {field.availableOptions.map(option => {
                return <option key={option.uuid} value={option.uuid} disabled>
                  {option.content}
                </option>;
              })}
            </select>
          </div>
        </FieldExpand>
      </span>
    );
  }

}

export default InlineDropdownBlock;
