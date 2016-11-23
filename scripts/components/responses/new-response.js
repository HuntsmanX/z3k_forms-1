import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Callout           from "./../shared/callout";
import Button            from "./../shared/button";
import Loader            from "./../shared/loader";
import UserSelectOption  from "./user-select-forms";
import SetSelectedValue  from "./set-selected-value";

import Form, {
  Fieldset,
  FormFooter,
  FormField,
  FormSelect,
  FormSelectWithAjax
} from "./../shared/form";

@inject("s")
@observer
class NewResponse extends Component {
  
  render() {
    const { s: { responses } } = this.props;
    const { model: response, tests, loading } = responses;

    if (loading) return <Loader />;

    const formatOption = (el) => ({
      ...el,
      value: el.id,
      label: el.fullNameEng
    });

    return (
      <Form onSubmit={responses.create.bind(responses)} model={response}>
        <Callout>
          <Fieldset legend="New Response">
            <FormSelect model={response} attr="testId" label="Test" options={tests} />
            <FormSelectWithAjax
              model={response}
              url="/testees/find"
              attr="userId"
              label="User"
              optionComponent={UserSelectOption}
              valueComponent={SetSelectedValue}
              formatOption={formatOption}
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
