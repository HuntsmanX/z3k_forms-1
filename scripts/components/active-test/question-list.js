import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Question             from "./question";

@inject("s")
@observer
class QuestionsList extends Component {

  render() {
    const { section, s: { sections } } = this.props;

    return(
      <div className="questions-list">
        {section.questions.map((question, index) => {
          return <Question
            key={question.uuid}
            index={index}
            question={question}
          />;
        })}
      </div>
    );
  }

}
export default QuestionsList;
