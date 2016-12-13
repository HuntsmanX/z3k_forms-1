import React, { Component } from "react";

const Value = (InnerComponent) => class extends Component {

  render() {
    const { value } = this.props;

    return (
      <div className="Select-value">
        <span className="Select-value-label">
  				<InnerComponent {...value} />
  			</span>
      </div>
    );
  }

}

export default Value;
