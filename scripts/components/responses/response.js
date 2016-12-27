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
    const { model, s: { responses, session: { ifAllowed } } } = this.props;

    return (
      <li>
        <Row>
          <Column large={4}>
            <Hash k='Test' v={model.name} />
            <Hash k='Name' v={model.userFullNameEng} />
          </Column>

          <Column large={3}>
            <Hash k='Date' v={model.createdAtFormatted} />
            <Hash
              k='Successful'
              v={
                <span className={`label ${model.isSuccessfulLabelClass}`}>
                  {model.isSuccessfulLabel}
                </span>
              }
            />
          </Column>

          <Column large={2}>
            <Hash k='Sections' v={model.sectionsCount} w="70/30" />
            <Hash k='Total Questions' v={model.questionsCount} w="70/30" />
          </Column>

          <Column large={2}>
            <Hash k='Max Score' v={model.maxScore} w="70/30" />
            <Hash k='Scored' v={model.userScore} w="70/30" />
          </Column>

          <Column large={1}>
            <div className="button-group small float-right">
              {ifAllowed(model, 'view',
                <Link to="verifyResponse" params={{ id: model.id }} button={{ icon: "spellcheck" }} />
              )}
            </div>
          </Column>
        </Row>
      </li>
    );
  }

}

export default Response;
