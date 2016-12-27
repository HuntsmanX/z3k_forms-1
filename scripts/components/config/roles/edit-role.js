import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Loader  from "./../../shared/loader";
import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";

import Form, {
  Fieldset,
  FormFooter,
  TextField
} from "./../../shared/form";

import Permission from "./permission";

@inject("s")
@observer
class EditRole extends Component {

  render() {
    const { s: { roles, roles: { model: role } } } = this.props;

    const groupKeys = Object.keys(role.permissions.grouped);

    if (role.isBeingFetched) return <Loader />;

    return (
      <div id="edit-role">
        <Form onSubmit={roles.update.bind(roles)} model={role}>
          <Callout>
            <TextField model={role} attr="name" hint="" />

            {groupKeys.map(key => {
              return (
                <Fieldset key={key} legend={key}>
                  {role.permissions.grouped[key].map(permission => {
                    return <Permission
                      key={permission.uuid}
                      permission={permission}
                    />;
                  })}
                </Fieldset>
              );
            })}

            <FormFooter>
              <Button type="submit" label="Save" icon="done"/>
            </FormFooter>
          </Callout>
        </Form>
      </div>
    );
  }

}

export default EditRole;
