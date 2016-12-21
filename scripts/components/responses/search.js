import React, { Component } from "react";

import Callout from "./../shared/callout";
import Button  from "./../shared/button";

import Form, { Fieldset, FormFooter, TextField, SelectField } from "./../shared/form";

class Search extends Component {

  render() {
    const { responses } = this.props;

    return (
      <Form onSubmit={responses.fetch.bind(responses)} collection={responses}>
        <Callout color="secondary">
          <Fieldset legend="Filter">
            <div className="row large-up-4">
              <TextField collection={responses} label="Test" attr="name_cont" layout="col" />
              <TextField collection={responses} label="Name" attr="user_first_name_eng_or_user_last_name_eng_cont" layout="col" />
              <SelectField
                collection={responses}
                label="Checked"
                attr="checked_eq"
                options={[{ value: null, label: 'Any' }, { value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                layout="col"
              />
            </div>
          </Fieldset>
          <FormFooter float="left">
            <Button type="submit" label="Search" icon="search" />
          </FormFooter>
        </Callout>
      </Form>
    );
  }

}

export default Search;
