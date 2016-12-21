import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";
import UserPermissions from "./user-permissions";
import UserPermission from "./user-permission";
import Loader from "../../shared/loader";
import uuid from "node-uuid";

import Form, {Fieldset, FormFooter, TextField, AjaxMultiSelect} from "./../../shared/form";

@inject("s")
@observer
class UserForm extends Component {

  render() {
    const user = this.props.s.users.model;
    const {s: {users}} = this.props;

    if (user.isBeingFetched) return <Loader />;

    return (
      <Form onSubmit={users.create.bind(users)} model={user}>
        <Callout>
          <Fieldset legend={user.fullNameEng}>
            <TextField model={user} attr="fullNameEng"/>
            <TextField model={user} attr="email"/>
          </Fieldset>
          <Fieldset legend="Add Roles">
            <AjaxMultiSelect
              model={user}
              attr="roles"
              url="/roles/find"
              minLength={1}
              label="Roles"
              multi
              formatOption={(el) => ({
                ...el,
                value: el.id,
                label: el.name
              })}
              hint=""
            />
            <Fieldset legend="User Permissions Summary">
              <Callout>
                {user.permissions.map(permission => {
                  return <UserPermission permission={permission} key={uuid.v4()}/>
                })}
              </Callout>
            </Fieldset>

            <Fieldset legend="User Permissions">
              <Callout>
                {user.roles.map(role => {
                  return <UserPermissions role={role} key={role.uuid}/>
                })}
              </Callout>
            </Fieldset>

          </Fieldset>
          <FormFooter>
            <Button type="submit" label="Save" icon="done"/>
          </FormFooter>
        </Callout>
      </Form>
    )
  }

}

export default UserForm;
