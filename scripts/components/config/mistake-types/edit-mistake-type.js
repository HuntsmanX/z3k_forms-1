import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { CompactPicker } from 'react-color'
import MistakeForm from "./mistake-form";
import Loader from "./../../shared/loader";

@inject("s")
@observer
class EditMistakeType extends Component {

  render() {
    const mistakeType = this.props.s.mistakeTypes.model;

    if (mistakeType.isBeingFetched) return <Loader />;

    return (
      <div id="edit-mistake-type">
        <div className="clearfix">
          <MistakeForm mistakeType={mistakeType}/>
        </div>
      </div>
    );
  }

}

export default EditMistakeType;
