import React, { Component } from "react";

const Option = (InnerComponent) => class extends Component {

  handleMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
    if (this.props.option.disabled) return;
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
    const { option, className } = this.props;

    return (
      <div
        className={className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
      >
        <InnerComponent {...option} />
      </div>
    );
  }

}

export default Option;
