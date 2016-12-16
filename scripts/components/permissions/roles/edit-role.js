import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { CompactPicker } from 'react-color'
import RoleForm from "./role-form";
import Loader from "./../../shared/loader";

@inject("s")
@observer
class EditRole extends Component {

  render() {
    const role = this.props.s.roles.model;
    const {s: {roles}} = this.props;

    if (role.isBeingFetched) return <Loader />;

    return (
      <div id="edit-role">
        <div className="clearfix">
          <RoleForm role={role} roles={roles}/>
        </div>
      </div>
    );
  }

}

export default EditRole;
