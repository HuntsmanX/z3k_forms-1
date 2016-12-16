import React, { Component } from "react";
import { observer } from "mobx-react";

import QuestionEditor from "./question-editor";

@observer
class Question extends React.Component {

  render() {
    const { question, index } = this.props;

    return (
      <div className="question indexed">
        <div className="index">{index + 1}</div>
        <QuestionEditor question={question} />
      </div>
    );
  }

}

export default Question;
