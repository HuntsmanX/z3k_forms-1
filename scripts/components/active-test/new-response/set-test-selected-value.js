import React, { Component } from "react";

class SetTestSelectedValue extends Component {

	render() {
    const { name } = this.props.value;

		return (
      <div className="Select-value">
        <span className="Select-value-label">
  				{`${name}`}
  			</span>
      </div>
		);
	}
};

SetTestSelectedValue.propTypes = {
  children:    React.PropTypes.node,
  placeholder: React.PropTypes.string,
  value:       React.PropTypes.object
}

export default SetTestSelectedValue;
