import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Button from "./../shared/button";
import Link   from "./../shared/link";
import Hash   from "./../shared/hash";
import Icon   from "./../shared/icon";

@inject("s")
@observer
class Test extends Component {

  render() {
    const { model: test, s: { tests } } = this.props;

    return (
      <li>
        <Row>
          <Column large={4}>
            <Hash k='Name' v={test.name} />
            <Hash k='Time Limit' v={test.timeLimit} />
          </Column>
          <Column large={3}>
            <Hash k='Sections' v={test.sectionsCount} />
            <Hash k='Max Score' v={test.maxScore} />
          </Column>
          <Column large={3}>
            <Hash k='Total Questions' v={test.questionsCount} w="60/40" />
            <Hash k='Shuffle Questions' v={test.shuffleQuestions} w="60/40" />
          </Column>
          <Column large={2}>
            <div className="button-group small float-right">
              <Link to="editTest" params={{ id: test.id }} button={{ icon: "mode_edit" }} />
              <Button icon="delete" color="alert" onClick={tests.destroy.bind(tests, test.id)} />
            </div>
          </Column>
        </Row>
        <Row>
          <Column large={12}>
            {test.warnings.length ? (
              <div className="warnings">
                {test.warnings}
              </div>
            ) : null}
          </Column>
        </Row>
      </li>
    );
  }

}

export default Test;
