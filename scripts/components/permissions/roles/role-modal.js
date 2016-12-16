import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {CompactPicker} from 'react-color'
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";
import Modal   from "./../../shared/modal";
import RoleForm   from "./role-form";

@inject("s")
@observer
class RoleModal extends Component {

  render() {
    const role = this.props.s.roles.model;
    const {s: {roles}} = this.props;

    return (
      <Modal
        title={role.isNew ? "New Role": role.name}
        show={roles.roleShown}
        onHide={roles.showNew.bind(roles, false)}
      >
        <RoleForm role={role} roles={roles} />
      </Modal>
    )
  }

}

export default RoleModal;
