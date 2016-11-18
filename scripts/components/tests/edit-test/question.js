import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "./../../shared/icon";
import Hash from "./../../shared/hash";

import QuestionEditor from "./question-editor";
import Controls       from "./question/controls";
import FieldsControls from "./question/fields-controls";

@observer
class Question extends Component {

  render() {
    const { question } = this.props;

    return (
      <div className="question">
        <ActionsLeft question={question} />
        <ActionsRight question={question} />

        <div className="main-content">
          <QuestionEditor question={question} />

          {question.isBeingEdited ? (
            <div>
              <Controls question={question} />
              <FieldsControls question={question} />
            </div>
          ) : (
            <QuestionStats question={question} />
          )}
        </div>
      </div>
    );
  }

}

@observer
class ActionsLeft extends Component {

  render() {
    const { question } = this.props;

    return (
      <div className="actions left">
        {question.isPersisted ? (
          <Icon className="action drag-handle">dehaze</Icon>
        ) : null}
      </div>
    );
  }

}

@observer
class ActionsRight extends Component {

  render() {
    const { question } = this.props;

    return (
      <div className="actions right">
        {question.isBeingEdited ? (
          <Icon className="action primary" onClick={question.save.bind(question)} title="Save">save</Icon>
        ) : (
          <Icon className="action primary" onClick={question.edit.bind(question)} title="Edit">mode_edit</Icon>
        )}
        <Icon
          className="material-icons action alert"
          title="Delete"
        >delete</Icon>
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
            <Hash k='Max Score' v={question.score} />
          </Column>

          <Column large={3}>
            <Hash k='Auto' v={question.autoScore} />
          </Column>

          <Column large={3}>
            <Hash k='Manually' v={question.manualScore} />
          </Column>

          <Column large={3}>
            <Hash k='' v='' />
          </Column>
        </Row>
      </div>
    );
  }

}

export default Question;
