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
      <div>
        <div className="question-list">
          <QuestionsList section={section} />
        </div>
        {section.timeLimit > 0 ?
            <div className="timer">
              <ResponseTimer timer={timer} section={section} sections={sections} />
          </div>
        : null}
      </div>
    );
  }

}

export default EditResponseSection;
