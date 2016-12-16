import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";
import {CompactPicker} from 'react-color'
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";

import Form, {
  Fieldset,
  FormFooter,
  TextField,
  AjaxMultiSelect
} from "./../../shared/form";

@observer
class RoleForm extends Component {

  render() {

    const {role, roles} = this.props;

    return (
      <Form onSubmit={roles.create.bind(roles)} model={role}>
        <Callout>
          <Fieldset legend={role.isNew ? "New Role": role.name}>
            <TextField model={role} attr="name" />
          </Fieldset>
          <Fieldset legend="Users">
            <AjaxMultiSelect
              model={role}
              attr="users"
              url="/v1/users/find"
              minLength={2}
              label="Users"
              multi
              formatOption={(el) => ({
                ...el,
                value: el.id,
                label: el.fullNameEng
              })}
              hint=""
            />
          </Fieldset>
          <FormFooter>
            <Button type="submit" label="Save" icon="done"/>
          </FormFooter>
        </Callout>
      </Form>
    )
  }

}

export default RoleForm;
