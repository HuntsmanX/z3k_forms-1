import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Button from "./../shared/button";
import Link   from "./../shared/link";
import Hash   from "./../shared/hash";

@inject("s")
@observer
class Response extends Component {

  render() {
    const { model } = this.props;
    const { responses } = this.props.s;

    return (
      <li>
        <Row>
          <Column large={4}>
            <Hash k='Name' v={model.name} />
            <Hash k='Testee' v={model.userFullNameEng} />
          </Column>
          <Column large={3}>
            <Hash k='Sections' v={model.sectionsCount} />
            <Hash k='Total Questions' v={model.totalQuestions} />
          </Column>
          <Column large={3}>
            <Hash k='Max Score' v={model.maxScore} />
            <Hash k='User Score' v={model.userScore} />
          </Column>
          <Column large={2}>
            <div className="button-group small float-right">
              <Link to="verifyResponse" params={{ id: model.id }} button={{ icon: "spellcheck" }} />
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default Response;
