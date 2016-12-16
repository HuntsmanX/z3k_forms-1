import React, { Component } from "react";
import { observer } from "mobx-react";

import FieldExpand from "./field-expand";

@observer
class CheckboxesBlock extends Component {

  handleChange = (event) => {
    this.props.blockProps.field.toggleSelectedOption(event.target.value);
  }

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        <div className="box-inputs">
          {field.availableOptions.map(option => {
            return (
              <label key={option.uuid}>
                <input
                  type="checkbox"
                  value={option.uuid}
                  checked={option.isSelected || false}
                  onChange={this.handleChange}
                  disabled={field.readOnly}
                />
                {option.content}
              </label>
            );
          })}
        </div>

        <FieldExpand field={field}>
          <div className="box-inputs">
            {field.availableOptions.map(option => {
              return (
                <label key={option.uuid}>
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    disabled
                  />
                  {option.content}
                </label>
              );
            })}
          </div>
        </FieldExpand>
      </div>
    );
  }

}

export default CheckboxesBlock;
