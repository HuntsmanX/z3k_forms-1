import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Button from "./shared/button";

@inject("s")
@observer
class Start extends Component {

  render() {
    const { s: { responses } } = this.props;
    const response = this.props.s.responses.model;

    return (
      <div>
        <h1>Hello {response.userFullNameEng}</h1>
        <p>
          This test is split into multiple pages with a certain number of questions on
          each page. Some or all pages will have a time limit and you will be shown
          a countdown timer in the top right corner of page. Please make sure you
          finish filling questions and press the submit button before the time ends,
          otherwise the system will submit your responses in an incomplete from. Press
          the start button when you are ready. Good luck!
        </p>
        <Button
          type="submit"
          label="Start"
          icon="done"
          onClick={responses.editSection.bind(responses, response.firstSectionUuid)}
        />
      </div>
    );
  }

}

export default Start;
