import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Modal   from "./../shared/modal";
import Callout from "./../shared/callout";
import Button  from "./../shared/button";

import Form, {
  Fieldset,
  FormFooter,
  FormField
} from "./../shared/form";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

@inject("s")
@observer
class NewTest extends Component {

  render() {
    const { s: { tests } } = this.props;
    const test = tests.model;

    return (
      <Modal
        title="New Test"
        show={tests.newTestShown}
        onHide={tests.showNew.bind(tests, false)}
      >
        <Form onSubmit={tests.create.bind(tests)} model={test}>
          <Callout>
            <Fieldset legend="New Test">
              <FormField model={test} attr="name" />
            </Fieldset>
            <FormFooter>
              <Button type="submit" label="Save" icon="done" />
            </FormFooter>
          </Callout>
        </Form>
      </Modal>
    );
  }

}

export default NewTest;
