import React, { Component } from "react";

class Question extends Component {

  render() {
    const { question } = this.props;

    return (
      <div className="question">
        {question.content}
      </div>
    );
  }

}

export default Question;
