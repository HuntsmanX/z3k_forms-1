import React, { Component } from "react";
import { observer } from "mobx-react";

import Icon from "../../shared/icon";

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
      <div className="content">
        <h2 className="title">{section.title}</h2>
        <div className="description">{section.description}</div>
      </div>
    );
  }

}

export default Section;
