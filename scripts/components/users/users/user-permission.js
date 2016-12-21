import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import uuid from "node-uuid";

import {CompactPicker} from 'react-color'
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";
import Icon from "./../../shared/icon";

import Hash   from "../../shared/hash";

@observer
class UserPermission extends Component {

  render() {

    const {permission} = this.props;
    const icon = permission.allowed ? 'done' : 'block';

    return (
      <div>
        <div key={uuid.v4()}>
          <Row>
            <Column large={1} />
            <Column large={4}>
              <Hash k={permission.label} v={<Icon className="control-icon">{icon}</Icon>}/>
            </Column>
          </Row>
        </div>
      </div>
    )
  }

}

export default UserPermission;
