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
      '#EF9A9A',
      '#F48FB1',
      '#CE93D8',
      '#B39DDB',
      '#9FA8DA',
      '#90CAF9',
      '#81D4FA',
      '#80DEEA',
      '#80CBC4',
      '#A5D6A7',
      '#C5E1A5',
      '#E6EE9C',
      '#FFF59D',
      '#FFE082',
      '#FFCC80',
      '#FFAB91',
      '#BCAAA4',
      '#B0BEC5',
      '#EEEEEE'
    ];
  }

  get colors() {
    return this.props.colors || this.defaultColors;
  }

  renderInput() {
    return (
      <div className="color-picker">
        <div className="swatch" onClick={this.handleClick}>
          <div className="color" style={{ backgroundColor: this.model.get(this.attr) }} />
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
