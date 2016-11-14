import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "./../../shared/icon";
import Hash from "./../../shared/hash";

import QuestionsList from "./questions-list";

@observer
class Section extends Component {

  render() {
    const { section } = this.props;
    return (
      <div className="section">
        <ActionsLeft section={section} />
        <ActionsRight section={section} />
        {section.isBeingEdited ? (
          <EditableContent section={section} />
        ) : (
          <Content section={section} />
        )}
        {section.isExpanded ? (
          <QuestionsList section={section} />
        ) : null}
      </div>
    );
  }

}

@observer
class ActionsLeft extends Component {

  render() {
    const { section } = this.props;

    return (
      <div className="actions left">
        {section.isPersisted ? (
          <Icon className="action drag-handle">dehaze</Icon>
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
        {section.isBeingEdited ? (
          <Icon className="action primary" title="Save" onClick={section.save}>save</Icon>
        ) : (
          <Icon className="action primary" title="Edit" onClick={section.edit}>edit</Icon>
        )}

        <Icon className="action alert" title="Delete">delete</Icon>

        {section.isPersisted ? (
          section.isExpanded ? (
            <Icon className="action" title="Collapse" onClick={section.toggle}>expand_less</Icon>
          ) : (
            <Icon className="action" title="Expand" onClick={section.toggle}>expand_more</Icon>
          )
        ) : null}
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

        <div className="attributes">
          <Row>
            <Column large={3}>
              <Hash w='45/55' k='Questions Count' v={section.questions.length} />
              <Hash w='45/55' k='Questions to Show' v='' />
              <Hash w='45/55' k='Shuffle Questions' v='' />
            </Column>

            <Column large={3}>
              <Hash w='45/55' k='Time Limit' v='' />
              <Hash w='45/55' k='Bonus Time' v='' />
            </Column>

            <Column large={3}>
              <Hash w='45/55' k='Max Score' v='' />
              <Hash w='45/55' k='Required Score' v='' />
              <Hash w='45/55' k='Score Units' v='' />
            </Column>

            <Column large={3}>
              <Hash w='45/55' k='Show Next Section' v='' />
              <Hash w='45/55' k='Acceptable Autoscore' v='' />
              <Hash w='45/55' k='Score Units' v='' />
            </Column>
          </Row>
        </div>
      </div>
    );
  }

}

@observer
class EditableContent extends Component {

  handleChange(attr, event) {
    this.props.section.set(attr, event.target.value);
  }

  render() {
    const { section } = this.props;

    return (
      <div className="content editable">
        <input
          type="text"
          className="edit-input title-input"
          onChange={this.handleChange.bind(this, 'title')}
          value={section.title}
          placeholder="Section title"
        />
        <input
          type="text"
          className="edit-input description-input"
          onChange={this.handleChange.bind(this, 'description')}
          value={section.description}
          placeholder="Section description"
        />
        <div className="attributes">
          <Row>
            <Column large={3}>
              <Hash w='45/55' k='Questions Count' v={section.questions.length} />
              <Hash w='45/55' k='Questions to Show' v='' />
              <Hash w='45/55' k='Shuffle Questions' v='' />
            </Column>

            <Column large={3}>
              <Hash w='45/55' k='Time Limit' v='' />
              <Hash w='45/55' k='Bonus Time' v='' />
            </Column>

            <Column large={3}>
              <Hash w='45/55' k='Max Score' v='' />
              <Hash w='45/55' k='Required Score' v='' />
              <Hash w='45/55' k='Score Units' v='' />
            </Column>

            <Column large={3}>
              <Hash w='45/55' k='Show Next Section' v='' />
              <Hash w='45/55' k='Acceptable Autoscore' v='' />
              <Hash w='45/55' k='Score Units' v='' />
            </Column>
          </Row>
        </div>
      </div>
    );
  }

}

export default Section;
