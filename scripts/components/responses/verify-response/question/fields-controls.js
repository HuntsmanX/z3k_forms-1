import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column }     from "react-foundation-components/lib/global/grid-flex";
import { LinkWithTooltip } from "react-foundation-components/lib/global/tooltip";

import Slider from "rc-slider";

import Icon from "../../../shared/icon";
import Hash from "../../../shared/hash";

@observer
class FieldsControls extends Component {

  render() {
    const {question: {availableFields}} = this.props;

    return (
      <div className="fields-controls">
        {availableFields.map((field, index) => {
          return <FieldControls key={field.uuid} index={index} field={field}/>;
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

    return (
      <div className="field-controls">
        <Row>
          <Column large={2}>
            {`${index + 1}. `}
            <LinkWithTooltip tooltipContent={field.tooltip}>
              <span tabIndex="1">{field.label}</span>
            </LinkWithTooltip>
          </Column>

          <Column large={3}>
            <Hash
              w='20/80'
              k='Score'
              v={
                <span style={{ display: 'inline-block', paddingTop: '0.2rem', width: '100%' }}>
                  <Slider
                    min={0}
                    max={field.score}
                    step={0.01}
                    value={field.userScore}
                    onChange={(val) => field.set('userScore', val)}
                  />
                </span>
              }
            />
          </Column>
        </Row>
      </div>
    );
  }

}

export default FieldsControls;
