import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Modal   from "./shared/modal";
import Callout from "./shared/callout";
import Button  from "./shared/button";

import Form, {
  Fieldset,
  FormFooter,
  FormField
} from "./shared/form";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

@inject("s")
@observer
class SignIn extends Component {
  render() {
    const { s: { session } } = this.props;
    const currentUser = session.currentUser
  
    return (
      <Modal
        title="Sign In"
        show={session.signInFormShown}
        onHide={session.signInForm.bind(session, false)}
      >
      <Form onSubmit={session.create.bind(session)} model={currentUser}>
        <Callout>
          <Fieldset legend="Sign In">
            <FormField model={currentUser} attr="email" />
            <FormField model={currentUser} attr="password" />
          </Fieldset>
          <FormFooter>
            <Button type="submit" label="Log In" icon="done" />
          </FormFooter>
        </Callout>
      </Form>
      </Modal>
    )
}
}
export default SignIn;
