import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";
import { Label } from "react-foundation-components/lib/global/label";

import Button from "./../../shared/button";
import Hash   from "./../../shared/hash";

@inject("s")
@observer
class MistakeType extends Component {

  render() {
    const {
      model: mistakeType,
      s: { mistakeTypes, session: { ifAllowed } }
    } = this.props;

    return (
      <li>
        <Row>
          <Column large={3}>
            <Hash k='Name' v={mistakeType.name}/>
          </Column>
          <Column large={3}>
            <Hash k='Color' v={<Label style={{background: mistakeType.color}}>{mistakeType.color}</Label>}/>
          </Column>
          <Column large={3}>
            <Hash k='Penalty' v={mistakeType.penalty}>

            </Hash>
          </Column>
          <Column large={2}>
            <div className="button-group small float-right">
              {ifAllowed(mistakeType, 'update',
                <Button icon="mode_edit" onClick={mistakeTypes.show.bind(mistakeTypes, mistakeType.id)}/>
              )}
              {ifAllowed(mistakeType, 'delete',
                <Button icon="delete" color="alert" onClick={mistakeTypes.destroy.bind(mistakeTypes, mistakeType.id)}/>
              )}
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default MistakeType;
