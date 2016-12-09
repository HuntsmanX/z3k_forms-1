import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Callout from "./shared/callout";
import Button  from "./shared/button";
import Form, { Fieldset, FormFooter, TextField} from "./shared/form";

@inject("s")
@observer
class SignIn extends Component {

  render() {
    const { session, session: { user } } = this.props.s;

    return (
      <Row>
        <Column large={6} largeOffset={3}>
          <Form onSubmit={session.create.bind(session)} model={user}>
            <Callout>
              <Fieldset legend="Sign In">
                <TextField model={user} attr="email" />
                <TextField model={user} attr="password" type="password"/>
              </Fieldset>
              <FormFooter>
                <Button type="submit" label="Sign In" icon="done" />
              </FormFooter>
            </Callout>
          </Form>
        </Column>
      </Row>
    )
  }

}
export default SignIn;
