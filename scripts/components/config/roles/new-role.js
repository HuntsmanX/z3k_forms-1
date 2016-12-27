import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";
import Modal   from "./../../shared/modal";

import Form, {
  Fieldset,
  FormFooter,
  TextField
} from "./../../shared/form";

@inject("s")
@observer
class NewRole extends Component {

  render() {
    const { s: { roles, roles: { model: role } } } = this.props;

    return (
      <Modal
        title="New Role"
        show={roles.newRoleShown}
        onHide={roles.showNew.bind(roles, false)}
      >
        <Form onSubmit={roles.create.bind(roles)} model={role}>
          <Callout>
            <Fieldset legend="New Role">
              <TextField model={role} attr="name" />
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

export default NewRole;
