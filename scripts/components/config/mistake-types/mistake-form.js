import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";
import Modal   from "./../../shared/modal";
import ColorPicker from "./../../shared/form/color-picker";

import Form, { Fieldset, FormFooter, TextField } from "./../../shared/form";

@inject("s")
@observer
class MistakeForm extends Component {

  render() {
    const mistakeType = this.props.s.mistakeTypes.model;
    const {s: {mistakeTypes}} = this.props;

    return (
      <Modal
        title={mistakeType.isNew ? "New Mistake Type": mistakeType.name}
        show={mistakeTypes.mistakeTypeShown}
        onHide={mistakeTypes.showNew.bind(mistakeTypes, false)}
      >
        <Form onSubmit={mistakeTypes.create.bind(mistakeTypes)} model={mistakeType}>
          <Callout>
            <Fieldset legend="New Mistake Type">
              <TextField model={mistakeType} attr="name"/>
              <div className="form-field row">
                <Column large={3}>
                  <label className="middle text-right">Color</label>
                </Column>
                  <ColorPicker model={mistakeType}/>
              </div>
              <TextField model={mistakeType} attr="penalty"/>
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
