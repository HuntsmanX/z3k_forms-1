import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import MistakeForm from "./mistake-form";
import { CompactPicker } from 'react-color'

@inject("s")
@observer
class NewMistakeType extends Component {

  render() {
    return (
      <MistakeForm />
    );
  }

}

export default NewMistakeType;
