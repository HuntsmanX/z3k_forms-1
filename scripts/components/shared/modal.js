import React, { Component } from "react";

import { Reveal } from 'react-foundation-components/lib/global/reveal';
import { CloseButton } from 'react-foundation-components/lib/global/close-button';

class Modal extends Component {

  render() {
    const { show, onHide, children, title } = this.props;

    return (
      <Reveal show={show} onHide={onHide}>
        <CloseButton onClick={onHide} />
        <h3>{title}</h3>
        {children}
      </Reveal>
    );
  }

}

export default Modal;
