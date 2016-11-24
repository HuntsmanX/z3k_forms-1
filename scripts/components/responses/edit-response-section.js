import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import QuestionsList         from "./question-list"

@inject("s")
@observer
class EditResponseSection extends Component {

  render() {
    const section = this.props.s.sections.model

    return(
      <div>
        <QuestionsList section={section}/>
      </div>
    );
  }

}

export default EditResponseSection;
