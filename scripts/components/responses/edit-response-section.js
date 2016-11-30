import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import QuestionsList  from "./question-list";
import ResponseTimer  from "./response-timer";
import Loader         from "./../shared/loader";
import LoadingWrapper from "./../shared/loading-wrapper";
import Button         from "./../shared/button";

@inject("s")
@observer
class EditResponseSection extends Component {

  render() {
    const { sections, sections: { model: section, timer } } = this.props.s;

    if (section.isBeingFetched) return <Loader />;

    return (
      <div className="section" style={{ position: 'relative' }}>
        {section.isBeingSaved ? <LoadingWrapper /> : null}

        <div className="description">
          {section.description}
          <hr />
        </div>
        <div className="question-list">
          <QuestionsList section={section} />
        </div>
        <Button
          type="submit"
          label="Submit"
          icon="done"
          onClick={() => sections.updateSection(section)}
        />
        <ResponseTimer timer={timer} />
      </div>
    );
  }

}

export default EditResponseSection;
