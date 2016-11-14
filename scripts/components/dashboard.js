import React, { Component } from "react";
import { inject } from "mobx-react";

@inject("s")
class Dashboard extends Component {

  componentDidMount() {
    this.props.s.ui.setPageTitle('Dashboard');
  }

  render() {
    return (
      <p>Dashboard is coming soon...</p>
    );
  }

}

export default Dashboard;
