import React, { Component } from "react";
import { observer } from "mobx-react";

import Option from "./option";

@observer
class OptionsList extends Component {

  addOption = (event) => {
    this.props.field.addOption();
  }

  render() {
    const { field } = this.props;

    if (!field.hasOptions) return null;

    return (
      <div>
        {field.availableOptions.map((option, index) => {
          return <Option
            key={option.uuid}
            option={option}
            deleteOption={field.deleteOption.bind(field, option.uuid)}
            onEnterPress={this.addOption}
            hasCorrectOptions={field.hasCorrectOptions}
            toggleSelected={field.toggleSelectedOption.bind(field, option.uuid)}
            index={index}
            uuid={option.uuid}
            move={field.moveOption.bind(field)}
          />
        })}
        <a onClick={this.addOption}>Add Option</a>
      </div>
    );
  }

}

export default OptionsList;
