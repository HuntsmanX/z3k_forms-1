import React        from "react";
import { observer } from "mobx-react";
import Select       from "react-select";

import ajax from "../../../helpers/ajax";

import Field from "./field"

import Option from "./ajax-select/option";
import Value  from "./ajax-select/value";

@observer
class AjaxSelect extends Field {

  handleChange = (event) => {
    const value = event ? event.value : "";
    this.props.model.set(this.props.attr, value);
  }

  loadOptions = (query) => {
    const { url, formatOption, minLength } = this.props;

    if (minLength && query.length < minLength) return Promise.resolve({ options: [] });

    return ajax({ url: url, method: 'GET', payload: { q: query } }).then(
      json => ({ options: Array.from(json).map(formatOption) })
    );
  }

  renderInput() {
    const { model, attr, optionComponent, valueComponent } = this.props;

    return (
      <Select.Async
        value={model.get(attr)}
        loadOptions={this.loadOptions}
        optionComponent={optionComponent ? Option(optionComponent) : undefined}
        valueComponent={valueComponent ? Value(valueComponent) : undefined}
        onChange={this.handleChange}
        className={this.inputClassName}
        cache={false}
        filterOption={() => true}
      />
    );
  }
}
export default AjaxSelect;
