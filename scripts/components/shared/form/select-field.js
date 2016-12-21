import React from "react";
import { observer } from "mobx-react";

import Field from "./field";

@observer
class SelectField extends Field {

  renderInput() {
    return (
      <select
        id={this.id}
        value={this.value}
        onChange={this.handleChange}
        className={this.inputClassName}
      >
        {this.props.options.map(option => {
          return <option
            key={String(option.value)}
            value={option.value}
          >
            {option.label}
          </option>;
        })}
      </select>
    )
  }

}

export default SelectField;
