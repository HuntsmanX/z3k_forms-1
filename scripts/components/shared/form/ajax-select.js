import React        from "react";
import { observer } from "mobx-react";
import Select       from "react-select";

import BaseSelect from "./base-select"

@observer
class AjaxSelect extends BaseSelect {

  handleChange = (option) => {
    const value = option ? option.value : "";
    this.props.model.set(this.props.attr, value);
  }

  renderInput() {
    return (
      <Select.Async
        value={this.value}
        loadOptions={this.loadOptions}
        optionComponent={this.optionComponent}
        valueComponent={this.valueComponent}
        onChange={this.handleChange}
        className={this.inputClassName}
        cache={false}
        filterOption={() => true}
      />
    );
  }
}
export default AjaxSelect;
