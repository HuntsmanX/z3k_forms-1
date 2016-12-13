import React, { Component } from "react";
import { observer }         from "mobx-react";
import { CompactPicker }    from 'react-color';

import Field from "./field";

@observer
class ColorPicker extends Field {

  state = {
    display: false
  }

  handleClick = () => {
    this.setState({ display: !this.state.display });
  }

  handleClose = () => {
    this.setState({ display: false });
  }

  handleChange = (color, event) => {
    this.model.set(this.attr, color.hex);
  }

  get defaultColors() {
    return [
      '#E57373',
      '#F06292',
      '#BA68C8',
      '#9575CD',
      '#7986CB',
      '#64B5F6',
      '#4FC3F7',
      '#4DD0E1',
      '#4DB6AC',
      '#81C784',
      '#AED581',
      '#DCE775',
      '#FFF176',
      '#FFD54F',
      '#FFB74D',
      '#FF8A65',
      '#A1887F',
      '#90A4AE',
      '#E0E0E0'
    ];
  }

  get colors() {
    return this.props.colors || this.defaultColors;
  }

  renderInput() {
    return (
      <div className="color-picker">
        <div className="swatch" onClick={this.handleClick}>
          <div className="color" style={{ backgroundColor: this.model.get(this.attr) }}>
            {this.model.get(this.attr)}
          </div>
        </div>
        {this.state.display ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <CompactPicker
              colors={this.colors}
              color={this.model.get(this.attr)}
              onChange={this.handleChange}
            />
          </div>
        ) : null }
      </div>
    );
  }

}

export default ColorPicker;
