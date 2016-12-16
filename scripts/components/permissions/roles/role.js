import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";
import { Label } from "react-foundation-components/lib/global/label";

import Link from "./../../shared/link";
import Hash   from "./../../shared/hash";

@inject("s")
@observer
class Role extends Component {

  render() {
    const { model: role, s: { roles } } = this.props;

    return (
      <li>
        <Row>
          <Column large={3}>
            <Hash k='Name' v={role.name}/>
          </Column>
          <Column large={9}>
            <div className="button-group small float-right">
              <Link to="editRole" params={{ id: role.id }} button={{ icon: "mode_edit" }} />
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default Role;
