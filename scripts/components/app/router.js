import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("s")
@observer
class Router extends Component {

  render() {
    const { s: { router } } = this.props;

    return (
      <div>
        {router.currentView && router.currentView.component}
      </div>
    );
  }

}

export default Router;
