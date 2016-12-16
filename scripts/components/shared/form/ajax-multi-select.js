import React      from "react";
import {observer} from "mobx-react";
import Select     from "react-select";

import ajax from "../../../helpers/ajax";

import Field from "./field"

import Option from "./ajax-multi-select/option";
import Value  from "./ajax-multi-select/value";

@observer
class AjaxMultiSelect extends Field {

  handleChange = (values) => {
    this.props.model[this.props.attr].add(values.filter(f => !f.uuid));
  };

  loadOptions = (query) => {
    const {url, formatOption, minLength} = this.props;

    if (minLength && query.length < minLength) return Promise.resolve({options: []});
    return ajax({url: url, method: 'GET', payload: {q: query}}).then(
      json => ({options: Array.from(json.data).map(formatOption)}));
  };

  renderInput() {
    const {model, attr, optionComponent, valueComponent, formatOption} = this.props;
    return (
        <Select.Async
          value={model[attr].length > 0 ? model[attr].map(formatOption) : []}
          loadOptions={this.loadOptions}
          options={this.props.model[this.props.attr].map(formatOption)}
          optionComponent={optionComponent ? Option(optionComponent) : undefined}
          valueComponent={valueComponent ? Value(valueComponent) : undefined}
          multi={true}
          onChange={this.handleChange}
          className={this.inputClassName}
        />
    );
  }
}
export default AjaxMultiSelect;
