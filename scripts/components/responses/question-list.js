import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Question             from "./question";
import Button               from "./../shared/button";

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
        <Button
          type="submit"
          label="Start"
          icon="done"
          onClick={() => sections.updateSection(section)}
        />
      </div>
    );
  }

}
export default QuestionsList;
