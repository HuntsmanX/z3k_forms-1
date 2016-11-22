import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Callout from "./../shared/callout";
import Button  from "./../shared/button";
import Loader from "./../shared/loader";

import Form, {
  Fieldset,
  FormFooter,
  FormField,
  FormSelect,
  FormSelectWithAjax
} from "./../shared/form";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

@inject("s")
@observer
class NewResponse extends Component {
  render() {
    const { model: response, tests, loading } = this.props.s.responses;

    if (loading) return <Loader />;

    return(
        <Form>
          <Callout>
            <Fieldset legend="New Response">
              <FormSelect model={response} attr="testId" label="Test" options={tests} />
              <FormSelectWithAjax model={response} attr="userId" label="User"/>
            </Fieldset>
            <FormFooter>
              <Button type="submit" label="Save" icon="done" />
            </FormFooter>
          </Callout>
        </Form>
    );
  }

}

export default NewResponse;
