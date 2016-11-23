import React, { Component } from "react";

class SetSelectedValue extends Component {

	render() {
		return (
      <div className="select-value" title={this.props.value.title}>
				<span className="select-value-label">
					{this.props.children}
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
