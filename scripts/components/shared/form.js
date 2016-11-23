import React, { Component } from "react";
import { observer }         from "mobx-react";
import humanize             from "underscore.string/humanize";
import Select               from 'react-select';
import ajax                 from './../../helpers/ajax';

import {
  FormField as FormField_,
  FormFieldInput,
  FormFieldLabel,
  FormFieldError
} from 'react-foundation-components/lib/global/forms-flex';

@observer
class Form extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const { children, model } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        {model && model.isBeingSaved ? (
          <div className="form-loader" />
        ): null}
        {children}
      </form>
    );
  }

}

class Fieldset extends Component {

  render() {
    const { legend, children } = this.props;

    return (
      <fieldset>
        <legend>{legend}</legend>
        {children}
      </fieldset>
    );
  }

}

class FormFooter extends Component {

  render() {
    const { float, children } = this.props;

    return (
      <footer className="clearfix">
        <div className={`float-${float}`}>
          {children}
        </div>
      </footer>
    );
  }

}

FormFooter.defaultProps = {
  float: 'right'
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
        <FormFieldInput large={9} value={model.get(attr)} onChange={this.onChange} />
        {hasError ? (
          <FormFieldError large={9} largeOffset={3}>
            {model.error(attr)[0]}
          </FormFieldError>
        ) : null}
      </FormField_>
    );
  }

}

@observer
class FormSelect extends Component {
  handleChange = (event) => {
    event ? this.props.model.set(this.props.attr, event.value) : this.props.model.set(this.props.attr, "");
  }

  render() {
    const { model, attr, options } = this.props;
    const label = this.props.label || humanize(attr);
    const opts = options.map(o => ({ value: o.id, label: o.name }));
    const hasError = model.errors.has(attr);

    return (
      <FormField_ grid>
      <FormFieldLabel alignment="right" middle large={3}>
        {label}
      </FormFieldLabel>
        <Select className="columns large-5"
          value={model.get(attr)}
          options={opts}
          onChange={this.handleChange}
          />
      {hasError ? (
        <FormFieldError large={9} largeOffset={3}>
          {model.error(attr)[0]}
        </FormFieldError>
      ) : null}
    </FormField_>)
  }
}

@observer
class FormSelectWithAjax extends Component {

  handleChange = (event) => {
    event ? this.props.model.set(this.props.attr, event.value) : this.props.model.set(this.props.attr, "");
  }

  render() {
    const { model, attr, url } = this.props;
    const label = this.props.label || humanize(attr);
    const hasError = model.errors.has(attr);

    const getOptions = (input) => {
      if (input.length < 2) return;
      return ajax({ url: url, method: 'GET', payload: { q: input}})
        .then((json) => {
          json.map(this.props.formatOptions);
            return { options: json };
        });
    }

    return (
      <FormField_ grid>
      <FormFieldLabel alignment="right" middle large={3}>
        {label}
      </FormFieldLabel>
        <Select.Async className="columns large-5"
          value={model.get(attr)}
          loadOptions={getOptions}
          optionComponent={this.props.selectOption}
          valueComponent={this.props.setValue}
          onChange={this.handleChange}
          />
      {hasError ? (
        <FormFieldError large={9} largeOffset={3}>
          {model.error(attr)[0]}
        </FormFieldError>
      ) : null}
    </FormField_>)
  }
}

export default Form;
  export { Fieldset, FormFooter, FormField, FormSelect, FormSelectWithAjax };
