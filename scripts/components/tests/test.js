import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Button from "./../shared/button";
import Link   from "./../shared/link";
import Hash   from "./../shared/hash";

@inject("s")
@observer
class Test extends Component {

  render() {
    const { model } = this.props;
    const { tests } = this.props.s;
    debugger

    return (
      <li>
        <Row>
          <Column large={4}>
            <Hash k='Name' v={model.name} />
            <Hash k='Time Limit' v={model.timeLimit} />
          </Column>
          <Column large={3}>
            <Hash k='Sections' v={model.numsOfSections} />
            <Hash k='Max Score' v={model.maxScore} />
          </Column>
          <Column large={3}>
            <Hash k='Total Questions' v={model.totalQuestions} />
            <Hash k='Shuffle Questions' v={model.shuffleQuestions} />
          </Column>
          <Column large={2}>
            <div className="button-group small float-right">
              <Link to="editTest" params={{ id: model.id }} button={{ icon: "mode_edit" }} />
              <Button icon="delete" color="alert" onClick={tests.destroy.bind(tests, model.id)} />
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default Test;
