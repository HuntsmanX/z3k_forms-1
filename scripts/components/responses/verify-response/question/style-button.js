import React, { Component } from "react";

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
        <i className="material-icons" title={iconTitle}>{icon}</i>
      </span>
    );
  }

}

export default StyleButton;
