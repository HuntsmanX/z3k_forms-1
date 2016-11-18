import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "./../../../shared/icon";

@observer
class Option extends Component {

  handleChange(attr, event) {
    this.props.option.set(attr, event.target.value);
  }

  handleKeyDown = (event) => {
    if (event.which === 13 || event.keyCode === 13)
      this.props.onEnterPress();
  }

  render() {
    const { option, index, hasCorrectOptions, toggleCorrect, deleteOption } = this.props;

    const icon = option.isCorrect ? 'done' : 'block';

    return (
      <Row className="choice-option">

        <Column large={1}>
          <label className="middle text-right drag-handle">
            <Icon className="action drag-handle">dehaze</Icon>
          </label>
        </Column>

        <Column large={8}>
          <input
            type="text"
            value={option.content}
            onChange={this.handleChange.bind(this, 'content')}
            onKeyDown={this.handleKeyDown}
            placeholder={`Option ${index + 1}`}
          />
        </Column>

        <Column large={3}>
          <label className="middle">
            {hasCorrectOptions ? (
              <Icon className="action" onClick={toggleCorrect}>{icon}</Icon>
            ) : null}
            <Icon className="action" onClick={deleteOption}>delete</Icon>
          </label>
        </Column>

      </Row>
    );
  }

}

export default Option;
