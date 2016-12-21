import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import {CompactPicker} from 'react-color'
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";
import UserPermission from "./user-permission";
import {Fieldset} from "../../shared/form";

@observer
class UserPermissions extends Component {

  render() {

    const {role} = this.props;
    const groupKeys = Object.keys(role.permissions.groupedByRole);

    return (
      <div>
        {groupKeys.map(key => {
          return (
            <Fieldset key={key} legend={key}>
              {role.permissions.groupedByRole[key].map(permission => {
                return <UserPermission key={permission.uuid} permission={permission}/>
              })}
            </Fieldset>
          );
        })
        }

      </div>
    )
  }

}

export default UserPermissions;
