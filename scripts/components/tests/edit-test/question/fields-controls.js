import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column }     from "react-foundation-components/lib/global/grid-flex";
import { LinkWithTooltip } from "react-foundation-components/lib/global/tooltip";

import Icon from "./../../../shared/icon";

import OptionsList from "./options-list";

@observer
class FieldsControls extends Component {

  render() {
    const { question: { availableFields } } = this.props;

    return (
      <div className="fields-controls">
        {availableFields.map((field, index) => {
          return <FieldControls key={field.uuid} index={index} field={field} />;
        })}
      </div>
    );
  }

}

@observer
class FieldControls extends Component {

  handleChange(attr, event) {
    this.props.field.set(attr, event.target.value);
  }

  render() {
    const { field, index } = this.props;
    const autocheckIcon = field.autocheck ? 'done' : 'block';

    return (
      <div className="field-controls">
        <Row>

          <Column large={2}>
            {`${index + 1}. `}
            <LinkWithTooltip tooltipContent={field.tooltip}>
              <span tabIndex="1">{field.label}</span>
            </LinkWithTooltip>
          </Column>

          <Column large={2}>
            <span className="control-label">Autocheck</span>
            <Icon className="control-icon" onClick={field.toggleAutocheck.bind(field)}>{autocheckIcon}</Icon>
          </Column>

          <Column large={2}>
            <span className="control-label">Max Score</span>
            <input type="text" className="score-input" value={field.score} onChange={this.handleChange.bind(this, 'score')} />
          </Column>

          <Column large={6}>
            <OptionsList field={field} />
          </Column>

        </Row>

        {field.formattedErrors.length ? (
          <div className="errors">{field.formattedErrors}</div>
        ) : null}
      </div>
    );
  }

}

export default FieldsControls;
