import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Section from "./edit-test/section";

import Loader from "./../shared/loader";

@inject("s")
@observer
class EditTest extends Component {

  render() {
    const test = this.props.s.tests.model;

    if (test.isBeingFetched) return <Loader />;

    return (
      <div id="edit-test">
        <div className="sections-list">
          {test.sections.length ? (
            this.renderSections()
          ) : (
            <p>No sections yet</p>
          )}
        </div>
        <div className="clearfix">
          <div className="float-right">
            <a onClick={test.addSection.bind(test)} className="btn-add">Add Section</a>
          </div>
        </div>
      </div>
    );
  }

  renderSections() {
    const test = this.props.s.tests.model;

    return test.sections.map((section, index) => {
      return <Section
        key={section.uuid}
        section={section}
        move={test.moveSection.bind(test)}
        uuid={section.uuid}
        index={index}
        deleteSection={() => test.deleteSection(section.uuid)}
      />
    });
  }

}

export default EditTest;
