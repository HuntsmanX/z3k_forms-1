import React, { Component } from "react";

class Icon extends Component {

  render() {
    const className = `material-icons ${this.props.className || ''}`;

    const props = Object.assign({}, this.props);

    delete props.className;

    return (
      <i className={className} {...props}>
        {this.props.children}
      </i>
    );
  }

}

export default Icon;
