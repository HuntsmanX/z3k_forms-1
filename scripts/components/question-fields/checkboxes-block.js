import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class CheckboxesBlock extends Component {

  handleChange = (event) => {
    this.props.blockProps.field.toggleSelectedOption(event.target.value);
  }

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        {field.availableOptions.map(option => {
          return (
            <label key={option.uuid}>
              <input
                type="checkbox"
                value={option.uuid}
                checked={option.isSelected}
                onChange={this.handleChange}
                disabled={field.readOnly}
              />
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

export default CheckboxesBlock;
