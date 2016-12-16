import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import RoleModal from "./role-modal";
import { CompactPicker } from 'react-color'

@inject("s")
@observer
class NewRole extends Component {

  render() {
    return (
      <RoleModal/>
    );
  }

}

export default NewRole;
