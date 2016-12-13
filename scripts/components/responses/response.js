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
          <Column large={2}>
            <Hash k='Sections' v={model.numsOfSections} w="70/30" />
            <Hash k='Total Questions' v={model.totalQuestions} w="70/30" />
          </Column>
          <Column large={2}>
            <Hash k='Max Score' v={model.maxScore} w="70/30" />
            <Hash k='Scored' v={model.userScore} w="70/30" />
          </Column>
          <Column large={3}>
            <Hash k='Checked' v='' w="70/30" />
            <Hash k='Successful' v='' w="70/30" />
          </Column>
          <Column large={1}>
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
