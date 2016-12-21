import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { CompactPicker } from 'react-color'
import UserForm from "./user-form";
import Loader from "./../../shared/loader";

@inject("s")
@observer
class ShowUser extends Component {

  render() {
    const users = this.props.s.users;
    const roles = this.props.s.roles;

    if (users.isBeingFetched) return <Loader />;

    return (
      <div id="show-user">
        <div className="clearfix">
          <UserForm user={users} roles={roles} />
        </div>
      </div>
    );
  }

}

export default ShowUser;
