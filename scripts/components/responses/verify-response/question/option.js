import React, {Component} from "react";
import { observer } from "mobx-react";

import { Column } from "react-foundation-components/lib/global/grid-flex";

@observer
class Option extends Component {

  handleChange(attr, event) {
    this.props.option.set(attr, event.target.value);
  }

  handleKeyDown = (event) => {
    if (event.which === 13 || event.keyCode === 13)
      this.props.onEnterPress();
  };

  render() {
    const { option, index } = this.props;

    return (
      <div className="row choice-option" style={{display: 'flex'}}>

        <Column large={7}>
          <input
            type="text"
            value={option.content}
            onChange={this.handleChange.bind(this, 'content')}
            onKeyDown={this.handleKeyDown}
            placeholder={`Option ${index + 1}`}

          />
        </Column>

      </div>
    );
  }

}

export default Option;
