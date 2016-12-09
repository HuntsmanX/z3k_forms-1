import React, {Component} from "react";
import reactCSS           from 'reactcss';
import {Row, Column}      from "react-foundation-components/lib/global/grid-flex";
import {observer, inject} from "mobx-react";
import {CompactPicker}    from 'react-color';

@observer
class ColorPicker extends Component {
  state = {
    displayColorPicker: false,
    colors: ['#E8E3E3', '#FFCCCC', '#E6A119', '#EBEB47', '#47EBEB', '#A3BEF5', '#F5A3F5', '#FFEB3B']
  };

  handleChange(mistakeType, color, event) {
    mistakeType.set('color', color.hex);
  }

  handleClick = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker})
  };

  handleClose = () => {
    this.setState({displayColorPicker: false})
  };

  render() {
    const {mistakeType} = this.props;

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${ mistakeType.color }`,
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
          <CompactPicker colors={this.state.colors} color={ mistakeType.color }
                         onChange={ this.handleChange.bind(this, mistakeType) }/>
        </div> : null }
      </Column>
    );
  }

}
export default ColorPicker;
