import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import QuestionsList  from "./question-list";
import Timer          from "./timer";
import Loader         from "./../shared/loader";
import LoadingWrapper from "./../shared/loading-wrapper";
import Button         from "./../shared/button";

@inject("s")
@observer
class ResponseSection extends Component {

  render() {
    const { activeTest, activeTest: { section, timer } } = this.props.s;

    if (section.isBeingFetched) return <Loader />;

    return (
      <div className="section" style={{ position: 'relative' }}>
        {section.isBeingSaved ? <LoadingWrapper /> : null}

        <div className="description">
          {section.description}
        </div>

        <QuestionsList section={section} />
        
        <Button
          type="submit"
          label="Submit"
          icon="done"
          onClick={activeTest.submitSection.bind(activeTest)}
        />
        <Timer timer={timer} />
      </div>
    );
  }

}

export default ResponseSection;
