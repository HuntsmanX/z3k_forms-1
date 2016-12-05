import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class Timer extends React.Component {

  render() {
    const { timer } = this.props;

    if (!timer) return null;

    return (
      <div className="timer">
        {timer.isBonusTime ? <h3>bonus time</h3> : null}
        <h1>{timer.formattedRemainingTime}</h1>
      </div>
    );
  }

}

export default Timer;
