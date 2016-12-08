import React, { Component } from "react";

class Fieldset extends Component {

  render() {
    const { legend, children } = this.props;

    return (
      <fieldset>
        <legend>{legend}</legend>
        {children}
      </fieldset>
    );
  }

}

export default Fieldset;
