import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import EntitiesListPanel from "./../shared/entities-list-panel";
import EntitiesList      from "./../shared/entities-list";
import Pagination        from "./../shared/pagination";

import User     from "./users/user";
import EditUser from "./users/edit-user";

@inject("s")
@observer
class Users extends Component {

  render() {

    const { s: { users, session: { ifAllowed } } } = this.props;

    return (
      <div>
        <EditUser />
        <EntitiesListPanel />
        <EntitiesList
          collection={users.collection}
          component={User}
        />
        <Pagination collection={users.collection} />
      </div>
    );
  }

}

export default Users;