import React, { Component } from "react";
import { observer } from "mobx-react";

import Field from "./field";

@observer
class TextField extends Field {

  renderInput() {
    return (
      <input
        id={this.id}
        type={this.type}
        value={this.value}
        onChange={this.handleChange}
        className={this.inputClassName}
      />
    );
  }

}

export default TextField;
