import React, { Component } from "react";
import { observer } from "mobx-react";

import Field from "./field";

@observer
class SelectField extends Field {

  renderInput() {
    return (
      <select value={this.model.get(this.attr)} onChange={this.handleChange}>
        {this.props.options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    );
  }

}

export default SelectField;
