import React, { Component } from "react";
import { observer } from "mobx-react";

import QuestionEditor from "./question-editor";

@observer
class Question extends React.Component {

  render() {
    const { question, index } = this.props;

    return (
      <QuestionEditor question={question} />
    );
  }

}

export default Question;
