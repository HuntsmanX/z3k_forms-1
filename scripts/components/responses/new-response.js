import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Callout           from "./../shared/callout";
import Button            from "./../shared/button";
import Loader            from "./../shared/loader";
import UserSelectOption  from './user-select-forms';
import SetSelectedValue  from './set-selected-value-select';

import Form, {
  Fieldset,
  FormFooter,
  FormField,
  FormSelect,
  FormSelectWithAjax
} from "./../shared/form";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

@inject("s")
@observer
class NewResponse extends Component {
  render() {
    const { model: response, tests, loading } = this.props.s.responses;
    const setOptions = element => {
                                    element['value'] = element['id'];
                                    element['label'] = element['fullNameEng']};
    if (loading) return <Loader />;

    return(
        <Form>
          <Callout>
            <Fieldset legend="New Response">
              <FormSelect model={response} attr="testId" label="Test" options={tests} />
              <FormSelectWithAjax model={response} url="/testees/find" attr="userId" label="User" selectOption={UserSelectOption} setValue={SetSelectedValue} setOptions={setOptions}/>
            </Fieldset>
            <FormFooter>
              <Button type="submit" label="Create" icon="done" />
            </FormFooter>
          </Callout>
        </Form>
    );
  }

}

export default NewResponse;
