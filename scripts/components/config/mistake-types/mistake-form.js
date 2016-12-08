import React, {Component} from "react";
import reactCSS from 'reactcss'
import {observer, inject} from "mobx-react";

import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";
import {CompactPicker} from 'react-color'
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";
import Modal   from "./../../shared/modal";

import Form, {
  Fieldset,
  FormFooter,
  FormField
} from "./../../shared/form";

@inject("s")
@observer
class MistakeForm extends Component {
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
    const mistakeType = this.props.s.mistakeTypes.model;
    const {s: {mistakeTypes}} = this.props;

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
      <Modal
        title={mistakeType.isNew ? "New Mistake Type": mistakeType.name}
        show={mistakeTypes.mistakeTypeShown}
        onHide={mistakeTypes.showNew.bind(mistakeTypes, false)}
      >
        <Form onSubmit={mistakeTypes.create.bind(mistakeTypes)} model={mistakeType}>
          <Callout>
            <Fieldset legend="New Mistake Type">
              <FormField model={mistakeType} attr="name"/>
              <div className="form-field row">
                <Column large={3}>
                  <label className="middle text-right">Color</label>
                </Column>
                <Column large={9}>
                  <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color }/>
                  </div>
                  { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <CompactPicker colors={this.state.colors} color={ mistakeType.color }
                                   onChange={ this.handleChange.bind(this, mistakeType) }/>
                  </div> : null }
                </Column>

              </div>
              <FormField model={mistakeType} attr="penalty"/>
            </Fieldset>
            <FormFooter>
              <Button type="submit" label="Save" icon="done"/>
            </FormFooter>
          </Callout>
        </Form>
      </Modal>
    )
  }

}

export default MistakeForm;
