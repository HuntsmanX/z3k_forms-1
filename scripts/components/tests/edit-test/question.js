import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "./../../shared/icon";
import Hash from "./../../shared/hash";

import QuestionEditor from "./question-editor";
import Controls       from "./question/controls";
import FieldsControls from "./question/fields-controls";

import { dragSource, dropTarget } from "./../../../helpers/sort-dnd";

@dropTarget("question")
@dragSource("question")
@observer
class Question extends Component {

  render() {
    const {
      question,
      connectDragSource,
      connectDragPreview,
      isDragging,
      connectDropTarget,
      deleteQuestion
    } = this.props;

    const opacity   = isDragging ? 0 : 1;
    const className = question.isBeingEdited ? "question edited" : "question";

    return connectDropTarget(
      <div className={className} style={{ opacity }}>

        <div className="actions left">
          {question.isPersisted ? (
            connectDragSource(
              <i className="material-icons action drag-handle">dehaze</i>
            )
          ) : null}
        </div>

        <ActionsRight question={question} deleteQuestion={deleteQuestion} />

        {connectDragPreview(
          <div className="main-content">
            <QuestionEditor question={question} />

            {question.formattedErrors.length ? (
              <div className="errors">{question.formattedErrors}</div>
            ) : null}

            {question.isBeingEdited ? (
              <div>
                <Controls question={question} />
                <FieldsControls question={question} />
              </div>
            ) : (
              <QuestionStats question={question} />
            )}
          </div>
        )}
      </div>
    );
  }

}

@observer
class ActionsRight extends Component {

  render() {
    const { question, deleteQuestion } = this.props;

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
        <Icon
          className="material-icons action alert"
          title="Delete"
          onClick={deleteQuestion}
        >
          delete
        </Icon>
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
