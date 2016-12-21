import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Callout from "./../shared/callout";
import Button  from "./../shared/button";
import Loader  from "./../shared/loader";
import Icon    from "./../shared/icon";

import Form, { Fieldset, FormFooter, AjaxSelect, TextField } from "./../shared/form";

@inject("s")
@observer
class NewResponse extends Component {

  render() {
    const { s: { activeTest, activeTest: { response } } } = this.props;

    return (
      <Form onSubmit={activeTest.createResponse.bind(activeTest)} model={response}>
        <Callout>
          <Fieldset legend="New Response">
            <AjaxSelect
               model={response}
               attr="testId"
               url="/v1/forms/tests/find_test"
               label="Test"
               formatOption={(el) => ({
                 ...el,
                 value:    el.id,
                 label:    el.name,
                 disabled: el.alerts.length > 0
               })}
               optionComponent={({ name, alerts }) => (
                 <div>
                   <div>{name}</div>
                   {alerts.length ? (
                     <div className="sub warning">{alerts.join(", ")}</div>
                   ) : null}
                 </div>
               )}
               hint=""
            />
            <AjaxSelect
              model={response}
              attr="userId"
              url="/v1/forms/testees/find"
              minLength={2}
              label="User"
              formatOption={(el) => ({
                ...el,
                value: el.id,
                label: el.fullNameEng
              })}
              optionComponent={({ fullNameEng, firstCalledOn, email, phone }) => (
                <div>
                  <div>{fullNameEng}</div>
                  <div className="sub clearfix">
                    <div className="float-left">
                      <Icon>email</Icon>&nbsp;{email}
                    </div>
                    <div className="float-right">
                      <Icon>access_time</Icon>&nbsp;{firstCalledOn}
                    </div>
                  </div>
                </div>
              )}
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
