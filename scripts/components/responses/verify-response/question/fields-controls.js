import React, { Component } from "react";
import { observer, inject } from "mobx-react";

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

@inject("s")
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
                <span className="score-slider">
                  <span className="left">0</span>
                  <span className="slider-input">
                    <Slider
                      min={0}
                      max={field.maxScore}
                      step={0.01}
                      value={field.userScore}
                      onChange={(val) => field.set('userScore', val)}
                    />
                  </span>
                  <span className="right">{field.maxScore}</span>
                </span>
              }
            />
          </Column>

          <Column large={4}>
            {field.fieldType === "text_editor" ? (
              Object.keys(field.editor.mistakesCount).map(key => {
                const mistake = field.editor.mistakesCount[key];
                return (
                  <Hash key={key}
                    k={mistake.name}
                    v={mistake.count}
                    w="70/30"
                  />
                );
              })
            ) : null}
          </Column>
        </Row>
      </div>
    );
  }

}

export default FieldsControls;
