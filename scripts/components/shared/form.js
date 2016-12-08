import React, { Component } from "react";
import { observer }         from "mobx-react";
import humanize             from "underscore.string/humanize";
import Select               from 'react-select';
import ajax                 from './../../helpers/ajax';

import { Column } from 'react-foundation-components/lib/global/grid-flex';

import {
  FormField as FormField_,
  FormFieldInput,
  FormFieldLabel,
  FormFieldError
} from 'react-foundation-components/lib/global/forms-flex';

import TextField  from "./form/text-field";
import Fieldset   from "./form/fieldset";
import FormFooter from "./form/form-footer";

@observer
class Form extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const { children, model, collection } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        {model && model.isBeingSaved || collection && collection.isBeingFetched ? (
          <div className="form-loader" />
        ) : null}
        {children}
      </form>
    );
  }

}


@observer
class FormField extends Component {

  onChange = (event) => {
    this.props.model.set(this.props.attr, event.target.value);
  }

  render() {
    const { model, attr } = this.props;
    const label = this.props.label || humanize(attr);
    const hasError = model.errors.has(attr);

    return (
      <FormField_ grid error={hasError}>
        <FormFieldLabel alignment="right" middle large={3}>
          {label}
        </FormFieldLabel>
        <FormFieldInput large={9} value={model.get(attr)} onChange={this.onChange} type={this.props.type} />
        {hasError ? (
          <FormFieldError large={9} largeOffset={3}>
            {model.error(attr)[0]}
          </FormFieldError>
        ) : null}
      </FormField_>
    );
  }
}

FormFieldInput.defaultProps = {
  type: 'text'
}

@observer
class FormSelectWithAjax extends Component {

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

  render() {
    const { model, attr, optionComponent, valueComponent } = this.props;

    const label    = this.props.label || humanize(attr);
    const hasError = model.errors.has(attr);

    return (
      <FormField_ grid error={hasError}>
        <FormFieldLabel alignment="right" middle large={3}>
          {label}
        </FormFieldLabel>
        <Column large={5}>
          <Select.Async
            value={model.get(attr)}
            loadOptions={this.loadOptions}
            optionComponent={optionComponent}
            valueComponent={valueComponent}
            onChange={this.handleChange}
          />
        </Column>
        {hasError ? (
          <FormFieldError large={9} largeOffset={3}>
            {model.error(attr)[0]}
          </FormFieldError>
        ) : null}
      </FormField_>
    );
  }
}

export default Form;
export { Fieldset, FormFooter, FormField, FormSelectWithAjax, TextField };
