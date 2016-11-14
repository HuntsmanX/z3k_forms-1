import React, { Component } from "react";

import { Button as Button_ } from 'react-foundation-components/lib/global/button';

import Icon from "./icon";

class Button extends Component {

  render() {
    const { label, size, icon } = this.props;

    const props = Object.assign({}, this.props);

    delete props.icon;
    delete props.label;

    return (
      <Button_ {...props}>
        {icon ? <Icon>{icon}</Icon> : null}
        {label}
      </Button_>
    );
  }

}

Button.defaultProps = {
  label: '',
  size:  'small',
  icon:  null
}

export default Button;
