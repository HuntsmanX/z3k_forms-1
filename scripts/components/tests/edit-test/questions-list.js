import React, { Component } from "react";
import { observer } from "mobx-react";

import Question from "./question";

@observer
class QuestionsList extends Component {

  render() {
    const { section, ifAllowed } = this.props;

    return (
      <div className="questions-list">
        {section.questions.length ? (
          this.renderQuestions()
        ) : (
          <p>No questions yet</p>
        )}

        {ifAllowed(
          <div className="clearfix">
            <div className="float-right">
              <a onClick={section.addQuestion.bind(section)}>Add Question</a>
            </div>
          </div>
        )}
      </div>
    );
  }

  renderQuestions() {
    const { section, ifAllowed } = this.props;

    return section.questions.map((question, index) => {
      return <Question
        key={question.uuid}
        question={question}
        move={section.moveQuestion.bind(section)}
        uuid={question.uuid}
        index={index}
        deleteQuestion={() => section.deleteQuestion(question.uuid)}
        ifAllowed={ifAllowed}
      />
    });
  }

}

export default QuestionsList;
