import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import QuestionEditor from "./question-editor";
import Link           from "./../shared/link";
import Hash           from "./../shared/hash";

@observer
class Question extends React.Component {

  render() {
    const { question, index } = this.props;
    return (
      <div>
        <QuestionEditor question={question} />
      </div>
    );
  }

}

export default Question;
