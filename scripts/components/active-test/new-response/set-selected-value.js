import React, { Component } from "react";

class SetSelectedValue extends Component {

	render() {
    const { fullNameEng, email, phone, firstCalledOn } = this.props.value;

		return (
      <div className="Select-value">
        <span className="Select-value-label">
  				{`${fullNameEng} (${email || phone} / ${firstCalledOn})`}
  			</span>
      </div>
		);
	}
};

SetSelectedValue.propTypes = {
  children:    React.PropTypes.node,
  placeholder: React.PropTypes.string,
  value:       React.PropTypes.object
}

export default SetSelectedValue;
