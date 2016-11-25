import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import QuestionsList         from "./question-list"

@inject("s")
@observer
class EditResponseSection extends Component {

  render() {
    if (this.props.s.sections.loading) return <p>loading</p>;

    const section = this.props.s.sections.model;

    return(
      <div>
        <QuestionsList section={section} sections={this.props.s.sections}/>
      </div>
    );
  }

}

export default EditResponseSection;
