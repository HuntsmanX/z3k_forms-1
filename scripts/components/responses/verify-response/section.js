import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "../../shared/icon";
import Hash from "../../shared/hash";

import QuestionsList from "./questions-list";

@observer
class Section extends Component {

  render() {
    const { section } = this.props

    return (
      <div className="section">
        <ActionsRight section={section} />

        <Content section={section} />

        {section.isExpanded ? (
          <QuestionsList section={section} />
        ) : null}
      </div>
    );
  }

}

@observer
class ActionsRight extends Component {

  render() {
    const { section } = this.props;

    return (
      <div className="actions right">
        {section.isExpanded ? (
            <Icon
              className="action"
              title="Collapse"
              onClick={section.toggle.bind(section)}
            >
              expand_less
            </Icon>
          ) : (
            <Icon
              className="action"
              title="Expand"
              onClick={section.toggle.bind(section)}
            >
              expand_more
            </Icon>
          )}
      </div>
    );
  }

}

@observer
class Content extends Component {

  render() {
    const { section } = this.props;

    return (
      <div>
        <h2 className="title">{section.title}</h2>
        <div className="description">{section.description}</div>

        <div className="attributes">
          <Row>
            <Column large={3}>
              <Hash
                w='45/55'
                k='Questions Count'
                v={section.questions.length}
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Required Score'
                v={section.requiredScore}
              />
              <Hash
                w='45/55'
                k='Acceptable Score'
                v={section.acceptableScore}
              />
              <Hash
                w='45/55'
                k='User Score'
                v={section.userScore}
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Passed'
                v={section.isPassed}
              />
            </Column>

          </Row>
        </div>
      </div>
    );
  }

}

export default Section;
