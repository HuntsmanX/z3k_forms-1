import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";
import { Label } from "react-foundation-components/lib/global/label";

import Button from "../../shared/button";
import Hash   from "../../shared/hash";

@inject("s")
@observer
class User extends Component {

  render() {
    const { model: user, s: { users, session: { ifAllowed } } } = this.props;

    return (
      <li>
        <Row>
          <Column large={5}>
            <Hash k='Name' v={user.fullNameEng} />
            <Hash k='Email' v={user.email} />
          </Column>
          <Column large={5}>
            <Hash k='Roles' v={user.roleNames} />
          </Column>
          <Column large={2}>
            <div className="button-group small float-right">
              {ifAllowed(user, 'update',
                <Button icon="mode_edit" onClick={users.edit.bind(users, user.id)} />
              )}
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default User;
