import React, { Component } from "react";

import { Callout as Callout_ } from 'react-foundation-components/lib/global/callout';

class Callout extends Component {

  render() {
    const { children, color } = this.props;

    return (
      <Callout_ color={color} >
        {children}
      </Callout_>
    );
  }

}

Callout.defaultProps = {
  color: "primary"
}

export default Callout;
