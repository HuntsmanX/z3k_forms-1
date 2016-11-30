import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Section from "./verify-response/section";

@inject("s")
@observer
class VerifyResponse extends Component {
  render() {
    const response = this.props.s.responses.model;

    return(
      <div id="verify-response">
        <div className="sections-list">
          {response.sections.length ? (
            this.renderSections()
          ) : (
            <p>No sections yet</p>
          )}
        </div>
      </div>
    );
  }

  renderSections() { //TODO: move this to shared
    const response = this.props.s.responses.model;

    return response.sections.map((section, index) => {
      return <Section
        key={section.uuid}
        section={section}
        uuid={section.uuid}
        index={index}
      />
    });
  }

}

export default VerifyResponse;
