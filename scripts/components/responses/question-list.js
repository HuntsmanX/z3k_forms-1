import React, { Component } from "react";
import { observer } from "mobx-react";
import Question from  "./question";

@observer
class QuestionsList extends Component {
  render(){
    const section = this.props.section;
  
    return(
      <div className="questions-list">
        {section.questions.length ? (
          section.questions.map((question, index) => {
            return <Question
              key={question.uuid}
              index={index}
              question={question}
            />;
          })
        ) : (
          <p>No questions yet</p>
        )}
      </div>
    )
  }
}
export default QuestionsList;
