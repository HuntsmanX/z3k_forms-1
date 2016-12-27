import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Callout from "./../../shared/callout";
import Modal   from "./../../shared/modal";
import Button  from "./../../shared/button";

import Form, { Fieldset, FormFooter, AjaxMultiSelect } from "./../../shared/form";

@inject("s")
@observer
class EditUser extends Component {

  render() {
    const { s: { users, users: { model: user } } } = this.props;

    return (
      <Modal
        title={user.fullNameEng}
        show={users.editUserShown}
        onHide={users.showEdit.bind(users, false)}
      >
        <Form onSubmit={users.update.bind(users)} model={user}>
          <Callout>
            <Fieldset legend='Edit Roles'>
              <AjaxMultiSelect
                model={user}
                attr="roleIds"
                url="/v1/roles/find"
                label="Roles"
              />
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

export default EditUser;
