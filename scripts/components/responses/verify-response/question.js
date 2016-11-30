import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "../../shared/icon";
import Hash from "../../shared/hash";

import QuestionEditor from "./question-editor";
import FieldsControls from "./question/fields-controls";

@observer
class Question extends Component {

  render() {
    const { question } = this.props;
    const questionClassName = question.isBeingEdited ? "question edited" : "question";
    const className = questionClassName + (question.isChecked ? ' checked' : ' unchecked');

    return (
      <div className={className}>
        <ActionsRight question={question} />

          <div className="main-content">
            <QuestionEditor question={question} />

            {question.isBeingEdited ? (
              <FieldsControls question={question} />
            ) : (
              <QuestionStats question={question} />
            )}

            {question.formattedErrors.length ? (
              <div className="errors">{question.formattedErrors}</div>
            ) : null}

          </div>
      </div>
    )
  }

}

@observer
class ActionsRight extends Component {

  render() {
    const { question } = this.props;

    return (
      <div className="actions right">
        {question.isBeingEdited ? (
          <Icon
            className="action primary"
            onClick={question.save.bind(question)}
            title="Save"
          >
            save
          </Icon>
        ) : (
          <Icon
            className="action primary"
            onClick={question.edit.bind(question)}
            title="Edit"
          >
            mode_edit
          </Icon>
        )}
      </div>
    );
  }

}

@observer
class QuestionStats extends Component {

  render() {
    const { question } = this.props;

    return (
      <div className="question-stats">
        <Row>
          <Column large={3}>
            <Hash k='Max Score' v={question.maxScore} />
          </Column>

          <Column large={2}>
            <Hash k='Auto' v={question.autoScore} />
          </Column>

          <Column large={3}>
            <Hash k='Manually' v={question.manualScore} />
          </Column>

          <Column large={2}>
            <Hash k='User Score' v={question.userScore} />
          </Column>

          <Column large={2}>
            <Hash k='Percentage' v={question.userResultPercentage} />
          </Column>
        </Row>
      </div>
    );
  }

}

export default Question;
