import React, { Component } from "react";
import { observer }         from "mobx-react";
import humanize             from "underscore.string/humanize";

import { Column } from 'react-foundation-components/lib/global/grid-flex';

import {
  FormFieldInput,
  FormFieldLabel,
  FormFieldError
} from 'react-foundation-components/lib/global/forms-flex';

import TextField  from "./form/text-field";
import Fieldset   from "./form/fieldset";
import FormFooter from "./form/form-footer";
import AjaxSelect from "./form/ajax-select";

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

export default Form;
export { Fieldset, FormFooter, TextField, AjaxSelect };
