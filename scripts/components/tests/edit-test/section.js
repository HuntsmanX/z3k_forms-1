import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon           from "./../../shared/icon";
import Hash           from "./../../shared/hash";
import LoadingWrapper from "./../../shared/loading-wrapper";

import QuestionsList from "./questions-list";

import { dragSource, dropTarget } from "./../../../helpers/sort-dnd";

@dropTarget("section")
@dragSource("section")
@observer
class Section extends Component {

  render() {
    const {
      section,
      deleteSection,
      connectDragSource,
      connectDragPreview,
      isDragging,
      connectDropTarget
    } = this.props;

    const opacity      = isDragging ? 0 : 1;
    const contentClass = section.isBeingEdited ? "content editable" : "content";

    return connectDropTarget(
      <div className="section" style={{ opacity }}>
        {section.isBeingSaved || section.isBeingDestroyed ? (
          <LoadingWrapper spinner />
        ) : null}

        <div className="actions left">
          {section.isPersisted ? (
            connectDragSource(
              <i className="material-icons action drag-handle">dehaze</i>
            )
          ) : null}
        </div>

        <ActionsRight section={section} deleteSection={deleteSection} />

        {connectDragPreview(
          <div className={contentClass}>
            {section.isBeingEdited ? (
              <EditableContent section={section} />
            ) : (
              <Content section={section} />
            )}

            {section.warnings.length ? (
                <div className="warnings">{section.warnings}</div>
              ) : null}

            {section.formattedErrors.length ? (
              <div className="errors">{section.formattedErrors}</div>
            ) : null}
          </div>
        )}

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
    const { section, deleteSection } = this.props;

    return (
      <div className="actions right">
        {section.isBeingEdited ? (
          <Icon
            className="action primary"
            title="Save"
            onClick={section.save.bind(section)}
          >
            save
          </Icon>
        ) : (
          <Icon
            className="action primary"
            title="Edit"
            onClick={section.edit.bind(section)}
          >
            edit
          </Icon>
        )}

        <Icon
          className="action alert"
          title="Delete"
          onClick={deleteSection}
        >
          delete
        </Icon>

        {section.isPersisted ? (
          section.isExpanded ? (
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
              <Hash
                w='45/55'
                k='Questions to Show'
                v={section.questionsToShowLabel}
              />
              <Hash
                w='45/55'
                k='Shuffle Questions'
                v={
                  <Icon className="action">{section.shuffleQuestionsIcon}</Icon>
                }
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Time Limit'
                v={section.timeLimitLabel}
              />
              <Hash
                render={section.bonusTimeRequired}
                w='45/55'
                k='Bonus Time'
                v={section.bonusTimeLabel}
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Max Score'
                v={section.maxScoreLabel}
              />
              <Hash
                w='45/55'
                k='Required Score'
                v={section.requiredScore}
              />
              <Hash
                w='45/55'
                k='Score Units'
                v={section.requiredScoreUnitsLabel}
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Show Next Section'
                v={section.showNextSectionLabel}
              />
              <Hash
                render={section.acceptableScoreRequired}
                w='45/55'
                k='Acceptable Autoscore'
                v={section.acceptableScore}
              />
              <Hash
                render={section.acceptableScoreRequired}
                w='45/55'
                k='Score Units'
                v={section.acceptableScoreUnitsLabel}
              />
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
      <div>
        <input
          type="text"
          className="edit-input title-input"
          onChange={this.handleChange.bind(this, 'title')}
          value={section.title}
          placeholder="Section title"
          ref={section.assignInputRef.bind(section)}
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
              <Hash
                w='45/55'
                k='Questions Count'
                v={section.questions.length}
              />
              <Hash
                w='45/55'
                k='Questions to Show'
                v={<input
                  type="text"
                  onChange={this.handleChange.bind(this, 'questionsToShow')}
                  value={section.questionsToShow}
                  className="edit-input num-input"
                />}
              />
              <Hash
                w='45/55'
                k='Shuffle Questions'
                v={
                  <Icon
                    className="action"
                    onClick={() => section.toggleShuffleQuestions()}
                  >
                    {section.shuffleQuestionsIcon}
                  </Icon>
                }
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Time Limit'
                v={<input
                  type="text"
                  onChange={this.handleChange.bind(this, 'timeLimit')}
                  value={section.timeLimit}
                  className="edit-input num-input"
                />}
              />
              <Hash
                render={section.bonusTimeRequired}
                w='45/55'
                k='Bonus Time'
                v={<input
                  type="text"
                  onChange={this.handleChange.bind(this, 'bonusTime')}
                  value={section.bonusTime}
                  className="edit-input num-input"
                />}
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Max Score'
                v={section.maxScoreLabel}
              />
              <Hash
                w='45/55'
                k='Required Score'
                v={<input
                  type="text"
                  onChange={this.handleChange.bind(this, 'requiredScore')}
                  value={section.requiredScore}
                  className="edit-input num-input"
                />}
              />
              <Hash
                w='45/55'
                k='Score Units'
                v={<select
                  className="edit-input select"
                  value={section.requiredScoreUnits}
                  onChange={this.handleChange.bind(this, 'requiredScoreUnits')}
                >
                  {Object.keys(section.scoreUnitsMap).map(key => {
                    return <option key={key} value={key}>
                      {section.scoreUnitsMap[key]}
                    </option>;
                  })}
                </select>}
              />
            </Column>

            <Column large={3}>
              <Hash
                w='45/55'
                k='Show Next Section'
                v={<select
                  className="edit-input select"
                  value={section.showNextSection}
                  onChange={this.handleChange.bind(this, 'showNextSection')}
                >
                  {Object.keys(section.showNextSectionMap).map(key => {
                    return <option key={key} value={key}>
                      {section.showNextSectionMap[key]}
                    </option>;
                  })}
                </select>}
              />
              <Hash
                render={section.acceptableScoreRequired}
                w='45/55'
                k='Acceptable Autoscore'
                v={<input
                  type="text"
                  onChange={this.handleChange.bind(this, 'acceptableScore')}
                  value={section.acceptableScore}
                  className="edit-input num-input"
                />}
              />
              <Hash
                render={section.acceptableScoreRequired}
                w='45/55'
                k='Score Units'
                v={<select
                  className="edit-input select"
                  value={section.acceptableScoreUnits}
                  onChange={this.handleChange.bind(this, 'acceptableScoreUnits')}
                >
                  {Object.keys(section.scoreUnitsMap).map(key => {
                    return <option key={key} value={key}>
                      {section.scoreUnitsMap[key]}
                    </option>;
                  })}
                </select>}
              />
            </Column>
          </Row>
        </div>
      </div>
    );
  }

}

export default Section;
