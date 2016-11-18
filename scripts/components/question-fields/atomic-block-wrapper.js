import React, { Component } from "react";
import includes from "lodash/includes";

const BLOCK_FIELDS = [
  'text_input',
  'text_area',
  'dropdown',
  'checkboxes',
  'radio_buttons',
  'sequence',
  'text_editor'
];

const INLINE_FIELDS = [
  'inline_text_input',
  'inline_dropdown'
];

class AtomicBlockWrapper extends Component {

  render() {
    const type = this.props.children[0].props.children.props.blockProps.atomicBlockType;

    if (type === 'eol-block') {

      return <br data-offset-key={this.props['data-offset-key']} />;

    } else if (includes(BLOCK_FIELDS, type)) {

      return (
        <div className="block-input">
          {this.props.children[0]}
        </div>
      );

    } else if (includes(INLINE_FIELDS, type)) {

      return (
        <div className="inline-input">
          {this.props.children[0]}
        </div>
      );
    }

    return this.props.children[0];
  }

}

export default AtomicBlockWrapper;
