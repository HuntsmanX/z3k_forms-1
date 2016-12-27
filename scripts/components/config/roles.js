import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import EntitiesListPanel from "./../shared/entities-list-panel";
import EntitiesList      from "./../shared/entities-list";
import Button            from "./../shared/button";
import Pagination        from "./../shared/pagination";

import NewRole from "./roles/new-role";
import Role    from "./roles/role";

@inject("s")
@observer
class Roles extends Component {

  render() {

    const { s: { roles, session: { ifAllowed } } } = this.props;

    return (
      <div>
        {ifAllowed('staff:role', 'update', <NewRole />)}
        <EntitiesListPanel>
          {ifAllowed('staff:role', 'update',
            <Button
              label="New Role"
              icon="add"
              onClick={roles.showNew.bind(roles, true)}
            />
          )}
        </EntitiesListPanel>
        <EntitiesList
          collection={roles.collection}
          component={Role}
        />
        <Pagination collection={roles.collection} />
      </div>
    );
  }

}

export default Roles;
