import React, { Component } from "react";

import Icon from "./../../shared/icon";

class StyleButton extends Component {

  onToggle = (event) => {
    event.preventDefault();
    this.props.onToggle(this.props.value);
  }

  render() {
    const { active, icon, iconTitle } = this.props;

    let className = 'style-button';
    if (active) className += ' active';

    return (
      <span className={className} onMouseDown={this.onToggle}>
        <Icon title={iconTitle}>{icon}</Icon>
      </span>
    );
  }

}

export default StyleButton;
