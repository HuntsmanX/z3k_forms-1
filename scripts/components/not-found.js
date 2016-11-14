import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("s")
@observer
class NotFound extends Component {

  componentDidMount() {
    this.props.s.ui.setPageTitle("Not Found");
  }

  render() {
    return (
      <p>The page you are looking for doesn't exsit</p>
    );
  }

}

export default NotFound;
