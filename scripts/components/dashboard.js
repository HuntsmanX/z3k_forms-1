import React, { Component } from "react";
import { inject } from "mobx-react";

import { TextField } from "./shared/form";

@inject("s")
class Dashboard extends Component {

  componentDidMount() {
    this.props.s.ui.setPageTitle('Dashboard');
  }

  render() {
    return (
      <div>
        <p>Dashboard is coming soon...</p>
      </div>
    );
  }

}

export default Dashboard;
