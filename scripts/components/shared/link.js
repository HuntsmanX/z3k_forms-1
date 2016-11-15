import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Button from "./button";

@inject('s')
@observer
class Link extends Component {

  onClick = (event) => {
    const { s: { router }, refresh, to, params } = this.props;

    const middleClick  = event.which == 2;
    const cmdOrCtrl    = event.metaKey || event.ctrlKey;

    const shouldNavigateManually = refresh || middleClick || cmdOrCtrl;

    if (!shouldNavigateManually) {
      event.preventDefault();
      router.navigate(to, params);
    }
  }

  render() {
    const { s: { router }, to, params, children, button } = this.props;
    const href = router.replaceUrlParamsForView(to, params);

    if (button) {
      return (
        <Button onClick={this.onClick} href={href} {...button} />
      );
    }

    return (
      <a onClick={this.onClick} href={href}>
        {children}
      </a>
    );
  }

}

Link.wrappedComponent.defaultProps = {
  refresh: false,
  params:  {},
  button:  false
}

export default Link;
