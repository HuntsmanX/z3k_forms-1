import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";
import { Label } from "react-foundation-components/lib/global/label";

import Link from "../../shared/link";
import Hash   from "../../shared/hash";

@inject("s")
@observer
class User extends Component {

  render() {
    const { model: user, s: { users } } = this.props;

    return (
      <li>
        <Row>
          <Column large={5}>
            <Hash k='Name' v={user.fullNameEng}/>
          </Column>
          <Column large={5}>
            <Hash k='Email' v={user.email}/>
          </Column>
          <Column large={2}>
            <div className="button-group small float-right">
              <Link to="showUser" params={{ id: user.id }} button={{ icon: "mode_edit" }} />
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default User;
