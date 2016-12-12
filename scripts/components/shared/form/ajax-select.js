import React, { Component } from "react";
import uuid from "node-uuid";
import { observer } from "mobx-react";
import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';
import Field  from "./field"
import Select               from 'react-select';
import humanize from "underscore.string/humanize";
import ajax                 from '../../../helpers/ajax';

@observer
class AjaxSelect extends Field {

  handleChange = (event) => {
    const value = event ? event.value : "";
    this.props.model.set(this.props.attr, value);
  }

  loadOptions = (input) => {
    const { url, formatOption } = this.props;

    if (input.length < 2) return Promise.resolve({ options: [] });

    return ajax({ url: url, method: 'GET', payload: { q: input } }).then(
      json => ({ options: Array.from(json).map(formatOption) })
    );
  }

  renderInput() {
    const { model, attr, optionComponent, valueComponent } = this.props;
    return (
      <Select.Async
        value={model.get(attr)}
        loadOptions={this.loadOptions}
        optionComponent={optionComponent}
        valueComponent={valueComponent}
        onChange={this.handleChange}
        className={this.inputClassName}
      />
    );
  }
}
export default AjaxSelect;
