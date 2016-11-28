import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import QuestionsList from "./question-list";
import ResponseTimer from "./response-timer";
import Loader        from "./../shared/loader";

@inject("s")
@observer
class EditResponseSection extends Component {

  render() {
    const { sections } = this.props.s;

    if (sections.loading) return <Loader />;

    const section = sections.model;
    const timer   = sections.timer;

    return (
      <div className="section">
        <div className="question-list">
          <QuestionsList section={section} />
        </div>
        <div className="timer">
          <ResponseTimer timer={timer} section={section} sections={sections} />
        </div>
      </div>
    );
  }

}

export default EditResponseSection;
