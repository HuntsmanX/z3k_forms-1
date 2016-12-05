import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Link   from "./../shared/link";
import Loader from "./../shared/loader";

@inject("s")
@observer
class Start extends Component {

  render() {
    const { s: { activeTest: { response } } } = this.props;

    if (response.isBeingFetched) return <Loader />;

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
        <Link
          to="editResponseSection"
          params={{ uid: response.firstSectionUid }}
          button={{ icon: 'done', label: 'Start' }}
        />
      </div>
    );
  }

}

export default Start;
