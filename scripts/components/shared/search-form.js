import React, { Component } from "react";
import { observer }         from "mobx-react";
import humanize             from "underscore.string/humanize";
import ajax                 from './../../helpers/ajax';

import { Column } from 'react-foundation-components/lib/global/grid-flex';

import {
  FormField as FormField_,
  FormFieldInput,
  FormFieldLabel,
  FormFieldError
} from 'react-foundation-components/lib/global/forms-flex';

@observer
class SearchForm extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    const { children } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
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
  float: 'left'
}

@observer
class FormField extends Component {

  onChange = (event) => {
    this.props.collection.setQuery(this.props.attr, event.target.value);
  }

  render() {
    const { collection, label, attr } = this.props;

    return (
      <FormField_ column className="column">
        <FormFieldLabel>
          {label}
        </FormFieldLabel>
        <FormFieldInput value={collection.query.get(attr) || ""} onChange={this.onChange} />
      </FormField_>
    );
  }

}

export default SearchForm;
export { Fieldset, FormField, FormFooter };
