import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Callout              from "./../shared/callout";
import Button               from "./../shared/button";
import Loader               from "./../shared/loader";
import UserSelectOption     from "./new-response/user-select-forms";
import SetSelectedValue     from "./new-response/set-selected-value";
import TestSelectOption     from "./new-response/test-select-forms";
import SetTestSelectedValue from "./new-response/set-test-selected-value"
import Form, { Fieldset, FormFooter, AjaxSelect, TextField } from "./../shared/form";

@inject("s")
@observer
class NewResponse extends Component {

  render() {
    const { s: { activeTest, activeTest: { response } } } = this.props;

    const formatOption = (el) => ({
      ...el,
      value: el.id,
      label: (el.fullNameEng || el.name)
    });

    return (
      <Form onSubmit={activeTest.createResponse.bind(activeTest)} model={response}>
        <Callout>
          <Fieldset legend="New Response">
            <AjaxSelect
               model={response}
               url="/tests/find_test"
               attr="testId"
               label="Test"
               optionComponent={TestSelectOption}
               valueComponent={SetTestSelectedValue}
               formatOption={formatOption}
               hint=""
            />
            <AjaxSelect
              model={response}
              url="/testees/find"
              attr="userId"
              label="User"
              optionComponent={UserSelectOption}
              valueComponent={SetSelectedValue}
              formatOption={formatOption}
              hint=""
            />
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
