import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@observer
class ResponseTimer extends React.Component {

  render() {
    const { timer } = this.props;
    return (
      <div>
        <h1>{timer.showMinutes}</h1>
      </div>
    );
  }

}

export default ResponseTimer;
