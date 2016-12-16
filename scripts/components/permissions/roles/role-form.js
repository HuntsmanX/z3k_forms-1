import React, {Component} from "react";
import {observer, inject} from "mobx-react";

import Callout from "./../../shared/callout";
import Button  from "./../../shared/button";
import {CompactPicker} from 'react-color'
import {Row, Column} from "react-foundation-components/lib/global/grid-flex";

import Form, {
  Fieldset,
  FormFooter,
  TextField,
  AjaxMultiSelect,
  SelectField
} from "./../../shared/form";

@observer
class RoleForm extends Component {

  render() {

    const { role, roles } = this.props;

    const groupKeys = Object.keys(role.permissions.grouped);

    return (
      <Form onSubmit={roles.create.bind(roles)} model={role}>
        <Callout>
          <Fieldset legend={role.isNew ? "New Role": role.name}>
            <TextField model={role} attr="name" hint="" />
          </Fieldset>
          <Fieldset legend="Users">
            <AjaxMultiSelect
              model={role}
              attr="users"
              url="/v1/users/find"
              minLength={2}
              label="Users"
              multi
              formatOption={(el) => ({
                ...el,
                value: el.id,
                label: el.fullNameEng
              })}
              hint=""
            />
          </Fieldset>

          {groupKeys.map(key => {
            return (
              <Fieldset key={key} legend={key}>
                {role.permissions.grouped[key].map(permission => {
                  return <Permission key={permission.uuid} permission={permission} />
                })}
              </Fieldset>
            );
          })}

          <FormFooter>
            <Button type="submit" label="Save" icon="done"/>
          </FormFooter>
        </Callout>
      </Form>
    )
  }

}

@observer
class Permission extends Component {

  renderCondition = (condition) => {
    if (condition.type === 'select') return this.renderSelectCondition(condition);
  }

  renderSelectCondition = (condition) => {
    const { permission } = this.props;

    return (
      <select
        value={permission.getCondition(condition.name)}
        onChange={(e) => permission.setCondition(condition.name, e.target.value)}
      >
        {condition.options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    );
  }

  render() {
    const { permission } = this.props;

    return (
      <Row>
        <Column large={3}>
          <label>
            <input
              type="checkbox"
              value={permission.allowed}
              onChange={permission.toggleAllowed.bind(permission)}
            />
            {permission.label}
          </label>
        </Column>

        <Column large={3}>
          {permission.conditionOptions.map(condition => {
            return this.renderCondition(condition);
          })}
        </Column>
      </Row>
    )
  }

}

export default RoleForm;
