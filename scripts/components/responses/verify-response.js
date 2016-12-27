import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Section from "./verify-response/section";

import Loader from "./../shared/loader";

@inject("s")
@observer
class VerifyResponse extends Component {

  render() {
    const response = this.props.s.responses.model;

    if (response.isBeingFetched) return <Loader />;

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

  // TODO: move this to shared
  renderSections() {
    const response = this.props.s.responses.model;
    const { ifAllowed } = this.props.s.session;

    return response.sections.map((section, index) => {
      return <Section
        key={section.uuid}
        section={section}
        uuid={section.uuid}
        index={index}
        ifAllowed={ifAllowed.bind(null, response, 'update')}
      />
    });
  }

}

export default VerifyResponse;
