import React, { Component } from "react";
import { observer } from "mobx-react";

import uuid from "node-uuid";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";
import { Switch } from "react-foundation-components/lib/global/switch";

@observer
class Permission extends Component {

  renderCondition = (conditionKey, condition) => {
    if (condition.type === 'select') return this.renderSelectCondition(conditionKey, condition);
  };

  renderSelectCondition = (conditionKey, condition) => {
    const { permission } = this.props;
    const id = uuid.v4();

    return (
      <Row>
        <Column large={4}>
          <label htmlFor={id} className="middle text-right" style={{ marginBottom: 0 }}>
            {condition.label}
          </label>
        </Column>

        <Column large={8}>
          <select
            value={permission.getCondition(conditionKey)}
            onChange={(e) => permission.setCondition(conditionKey, e.target.value)}
            style={{ marginBottom: 0 }}
            id={id}
          >
            {condition.options.map(option => {
              return <option key={uuid.v4()} value={option.value}>{option.label}</option>
            })}
          </select>
        </Column>
      </Row>
    );
  };

  render() {
    const { permission } = this.props;
    const optionKeys = Object.keys(permission.conditionOptions);

    return (
      <Row>
        <Column large={6}>
          <label className="permission-switch">
            <Switch
              checked={permission.allowed}
              onToggle={permission.toggleAllowed.bind(permission)}
              size="tiny"
            />
            <span className="lbl">{permission.label}</span>
          </label>
        </Column>

        {optionKeys.map(key => {
          const condition = permission.conditionOptions[key];

          return (
            <Column large={4} key={uuid.v4()}>
              {this.renderCondition(key, condition)}
            </Column>
          );
        })}
      </Row>
    );
  }

}

export default Permission;
