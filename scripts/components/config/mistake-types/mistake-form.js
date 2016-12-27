import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";

import Modal       from "./../../shared/modal";
import ColorPicker from "./../../shared/form/color-picker";

import Form, { Fieldset, FormFooter, TextField } from "./../../shared/form";

@inject("s")
@observer
class MistakeForm extends Component {

  render() {
    const { s: { mistakeTypes, mistakeTypes: { model: mistakeType } } } = this.props;

    const onSubmit = mistakeType.isNew ?
      mistakeTypes.create.bind(mistakeTypes) :
      mistakeTypes.update.bind(mistakeTypes);

    return (
      <Modal
        title={mistakeType.isNew ? "New Mistake Type": mistakeType.name}
        show={mistakeTypes.mistakeTypeShown}
        onHide={mistakeTypes.showNew.bind(mistakeTypes, false)}
      >
        <Form onSubmit={onSubmit} model={mistakeType}>
          <Callout>
            <Fieldset legend={`${mistakeType.isNew ? 'New' : 'Edit'} Mistake Type`}>
              <TextField model={mistakeType} attr="name" />
              <ColorPicker model={mistakeType} attr="color" />
              <TextField model={mistakeType} attr="penalty" />
            </Fieldset>
            <FormFooter>
              <Button type="submit" label="Save" icon="done" />
            </FormFooter>
          </Callout>
        </Form>
      </Modal>
    )
  }

}

export default MistakeForm;
