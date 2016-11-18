import React, { Component } from "react";
import { observer } from "mobx-react";

import Question from "./question";

@observer
class QuestionsList extends Component {

  render() {
    const { section } = this.props;

    return (
      <div className="questions-list">
        {section.questions.length ? (
          this.renderQuestions()
        ) : (
          <p>No questions yet</p>
        )}

        <div className="clearfix">
          <div className="float-right">
            <a onClick={section.addQuestion.bind(section)}>Add Question</a>
          </div>
        </div>
      </div>
    );
  }

  renderQuestions() {
    const { section } = this.props;

    return section.questions.map(question => {
      return <Question
        key={question.uuid}
        question={question}
      />
    });
  }

}

export default QuestionsList;
