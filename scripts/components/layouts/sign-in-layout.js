import React, { Component } from "react";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

class SignInLayout extends Component {

  render() {
    const { children } = this.props;

    return (
      <div id="blank">
        {children}
      </div>
    );
  }

};

export default SignInLayout;
