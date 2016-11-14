import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Button from "./../shared/button";
import Hash from "./../shared/hash";

@inject("s")
@observer
class Test extends Component {

  render() {
    const { model } = this.props;
    const { tests } = this.props.s;

    return (
      <li>
        <Row>
          <Column large={4}>
            <Hash k='Name' v={model.name} />
            <Hash k='Time Limit' v={model.totalTimeLimit} />
          </Column>
          <Column large={3}>
            <Hash k='Sections' v='' />
            <Hash k='Max Score' v='' />
          </Column>
          <Column large={3}>
            <Hash k='Total Questions' v='' />
            <Hash k='Shuffle Questions' v='' />
          </Column>
          <Column large={2}>
            <div className="button-group small float-right">
              <Button icon="mode_edit" />
              <Button icon="delete" color="alert" onClick={tests.destroy.bind(null, model.id)} />
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default Test;
