import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@observer
class ResponseTimer extends React.Component {

  render() {
    const { timer, section } = this.props;
    return (
      <div>
        <h1>{timer.formattedRemainingTime}</h1>
      </div>
    );
  }

}

export default ResponseTimer;
