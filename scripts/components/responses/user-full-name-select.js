import React, { Component } from "react";

class UserFullName extends Component {

	render() {
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					{this.props.children}
				</span>
			</div>
		);
	}
};

UserFullName.propTypes = {
  children:    React.PropTypes.node,
  placeholder: React.PropTypes.string,
  value:       React.PropTypes.object
}

export default UserFullName;
