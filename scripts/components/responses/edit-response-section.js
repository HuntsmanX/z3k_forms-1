import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import QuestionsList from "./question-list";
import Loader        from "./../shared/loader";

@inject("s")
@observer
class EditResponseSection extends Component {

  render() {
    const { sections } = this.props.s;

    if (sections.loading) return <Loader />;

    const section = sections.model;

    return (
      <QuestionsList section={section} />
    );
  }

}

export default EditResponseSection;
