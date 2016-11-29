import React, { Component } from "react";
import { observer } from "mobx-react";

import Option from "./option";

@observer
class OptionsList extends Component {

  render() {
    const { field } = this.props;

    if (!field.hasOptions) return null;

    return (
      <div className="options-list">
        {field.availableOptions.map((option, index) => {
          return <Option
            key={option.uuid}
            option={option}
            hasCorrectOptions={field.hasCorrectOptions}
            toggleSelected={field.toggleSelectedOption.bind(field, option.uuid)}
            index={index}
            uuid={option.uuid}
          />
        })}
      </div>
    );
  }

}

export default OptionsList;
