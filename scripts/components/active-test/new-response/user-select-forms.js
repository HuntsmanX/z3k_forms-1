import React, { Component } from "react";

class UserSelectOption extends Component {

	handleMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}

	handleMouseEnter = (event) => {
		this.props.onFocus(this.props.option, event);
	}

	handleMouseMove = (event) => {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	}

	render() {
    const {
      option: { fullNameEng, email, firstCalledOn, phone },
      className
    } = this.props;

		return (
			<div
        className={className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
      >
        {`${fullNameEng} (${email || phone} / ${firstCalledOn})`}
			</div>
		);
	}
};

UserSelectOption.propTypes = {
  children:   React.PropTypes.node,
  className:  React.PropTypes.string,
  isDisabled: React.PropTypes.bool,
  isFocused:  React.PropTypes.bool,
  isSelected: React.PropTypes.bool,
  onFocus:    React.PropTypes.func,
  onSelect:   React.PropTypes.func,
  option:     React.PropTypes.object.isRequired,
}

export default UserSelectOption;
