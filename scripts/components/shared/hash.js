import React, { Component } from "react";

import { Row } from 'react-foundation-components/lib/global/grid-flex';

class Hash extends Component {

  render() {
    const { k: key, v: value, w: width, render } = this.props;

    if (!render) return null;

    let keyWidth = '', valueWidth = '';

    if (width) {
      [ keyWidth, valueWidth ] = width.split('/').map(w => `w-${w}`);
    }

    return (
      <Row className="hash">
        <div className={`key ${keyWidth}`}>
          {key}
        </div>
        <div className={`value ${valueWidth}`}>
          {value}
        </div>
      </Row>
    );
  }

}

Hash.defaultProps = {
  render: true
}

export default Hash;
