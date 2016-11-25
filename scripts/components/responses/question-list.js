import React, { Component } from "react";
import { observer }         from "mobx-react";
import Question             from  "./question";
import Button               from "./../shared/button";

@observer
class QuestionsList extends Component {
  render(){
    const section  = this.props.section;
    const sections = this.props.sections
    
    return(
      <div className="questions-list">
        {section.questions.map((question, index) => {
            return <Question
              key={question.uuid}
              index={index}
              question={question}
            />;
          })
        }
        <Button
          type="submit"
          label="Start"
          icon="done"
          onClick={sections.UpdateSection.bind(sections, section)}
        />
      </div>
    )
  }
}
export default QuestionsList;
