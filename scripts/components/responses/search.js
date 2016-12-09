import React, { Component } from "react";

import Callout from "./../shared/callout";
import Button  from "./../shared/button";

import Form, { Fieldset, FormFooter, TextField } from "./../shared/form";

class Search extends Component {

  render() {
    const { responses } = this.props;

    return (
      <Form onSubmit={responses.fetch.bind(responses)} collection={responses}>
        <Callout color="secondary">
          <Fieldset legend="Filter">
            <div className="row large-up-4">
              <TextField collection={responses} label="Name" attr="name_cont" layout="col" />
              <TextField collection={responses} label="Testee" attr="user_first_name_eng_cont" layout="col" />
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
