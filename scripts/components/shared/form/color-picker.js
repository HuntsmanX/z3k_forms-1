import React, {Component} from "react";
import reactCSS           from 'reactcss';
import {Row, Column}      from "react-foundation-components/lib/global/grid-flex";
import {observer, inject} from "mobx-react";
import {CompactPicker}    from 'react-color';

@observer
class ColorPicker extends Component {
  state = {
    displayColorPicker: false
  };

  handleClick = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker})
  };

  handleClose = () => {
    this.setState({displayColorPicker: false})
  };

  handleChange(attr, event) {
    this.props.model.set(attr, event.hex)
  }

  render() {
    const {model, attr, colors} = this.props;
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${ model.color }`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <Column large={9}>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color }/>
        </div>
        {this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <CompactPicker
            colors={colors}
            attr={attr}
            onChange={this.handleChange.bind(this, attr)}/>
        </div> : null }
      </Column>
    );
  }

}
export default ColorPicker;
