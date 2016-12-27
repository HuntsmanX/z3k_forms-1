import React        from "react";
import { observer } from "mobx-react";
import Select       from "react-select";

import BaseSelect from "./base-select";

@observer
class AjaxMultiSelect extends BaseSelect {

  handleChange = (options) => {
    const value = options.map(option => option.value);
    this.model.set(this.attr, value);
  };

  renderInput() {
    return (
      <Select.Async
        value={this.value.toJS()}
        loadOptions={this.loadOptions}
        optionComponent={this.optionComponent}
        valueComponent={this.valueComponent}
        multi={true}
        onChange={this.handleChange}
        className={this.inputClassName}
        cache={false}
        filterOption={() => true}
      />
    );
  }
}
export default AjaxMultiSelect;
