import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("s")
@observer
class EditResponse extends Component {

  render() {
    const response = this.props.s.responses.model;

    return(
      <div>
      </div>
    );
  }

}

export default EditResponse;