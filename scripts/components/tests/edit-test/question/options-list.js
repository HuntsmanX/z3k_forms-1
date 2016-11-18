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
        {field.options.map((option, index) => {
          return <Option
            key={option.uuid}
            option={option}
            index={index}
            deleteOption={field.deleteOption.bind(field, option.uuid)}
            onEnterPress={this.addOption}
            hasCorrectOptions={field.hasCorrectOptions}
            toggleCorrect={field.toggleCorrectOption.bind(field, option.uuid)}
          />
        })}
        <a onClick={this.addOption}>Add Option</a>
      </div>
    );
  }

}

export default OptionsList;
