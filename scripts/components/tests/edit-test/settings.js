import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Row, Column}      from "react-foundation-components/lib/global/grid-flex";
import Hash               from "./../../shared/hash";
import Callout            from "../../shared/callout";
import Loader             from "../../shared/loader";
import Icon               from "../../shared/icon";

@inject("s")
@observer
class TestSettings extends Component {

  handleChange = (attr, event) => {
    this.props.test.set(attr, event.target.value);
  };

  render() {
    const test = this.props.s.tests.model;

    if (test.isBeingFetched) return <Loader />;

    const handleChange = this.handleChange.bind(this);

    return (
      <div id="test-settings">
        <Callout>
          <div className="attributes">
            <Row>
              <Column large={3}>
                <Hash
                  w='45/55'
                  k='Total Sections Count'
                  v={test.sectionsCount}
                />
                <Hash
                  w='45/55'
                  k='Total Questions Count'
                  v={test.questionsCount}
                />
              </Column>

              <Column large={3}>
                <Hash
                  w='45/55'
                  k='Max Score'
                  v={test.maxScore}
                />
                <Hash
                  w='45/55'
                  k='Score Units'
                  v={test.isBeingEdited ? (
                    <SuccessCriterionSelect handleChange={handleChange} test={test}/>
                  ) : (test.successCriterionLabel)}

                />
              </Column>

              {test.successCriterion == 'total_score' ? (
                <TotalScoreContent handleChange={handleChange} test={test}/>
              ) : (
                <SuccessfulSectionsContent handleChange={handleChange} test={test}/>
              )}

              <Column large={1}>
                <div className="actions right">
                  {test.isBeingEdited ? (
                    <Icon
                      className="action primary"
                      title="Save"
                      onClick={test.save.bind(test)}
                    >
                      save
                    </Icon>
                  ) : (
                    <Icon
                      className="action primary"
                      title="Edit"
                      onClick={test.edit.bind(test)}
                    >
                      edit
                    </Icon>
                  )}
                </div>
              </Column>

            </Row>
          </div>
        </Callout>
      </div>
    );
  }

}

@observer
class TotalScoreContent extends Component {

  render() {
    const {test, handleChange} = this.props;

    return (
      <Column large={3}>
        <Hash
          w='45/55'
          k='Required score'
          v={test.isBeingEdited ? (<RequiredScoreInput handleChange={handleChange} test={test}/>) : (test.requiredScore)}
        />
        <Hash
          w='45/55'
          k='Required Score Units'
          v={test.isBeingEdited ? (<RequiredScoreUnitSelect handleChange={handleChange} test={test}/>) : (test.requiredScoreUnitsLabel)}
        />
      </Column>
    );
  }
}

@observer
class SuccessfulSectionsContent extends Component {

  render() {
    const {test, handleChange} = this.props;

    return (
      <Column large={5}>
        <Hash
          w='45/55'
          k='Successful Sections Count'
          v={test.isBeingEdited ? (<SuccessfulSectionsCountInput handleChange={handleChange} test={test}/>) : (test.successfulSectionsCount)}
        />
      </Column>
    );
  }

}

@observer
class SuccessCriterionSelect extends Component {

  render() {
    const {test, handleChange} = this.props;

    return (
      <select
        className="edit-input select"
        value={test.successCriterion}
        onChange={handleChange.bind(this, 'successCriterion')}
      >
        {Object.keys(test.successCriteriaMap).map(key => {
          return <option key={key} value={key}>
            {test.successCriteriaMap[key]}
          </option>;
        })}
      </select>
    );
  }
}

@observer
class SuccessfulSectionsCountInput extends Component {

  render() {
    const {test, handleChange} = this.props;

    return (
      <input
        type="text"
        className="edit-input num-input"
        onChange={handleChange.bind(this, 'successfulSectionsCount')}
        value={test.successfulSectionsCount}
        placeholder="Successful Sections Count"
        ref={test.assignInputRef.bind(test)}
      />
    );
  }
}

@observer
class RequiredScoreInput extends Component {

  render() {
    const {test, handleChange} = this.props;

    return (
      <input
        type="text"
        className="edit-input num-input"
        onChange={handleChange.bind(this, 'requiredScore')}
        value={test.requiredScore}
        placeholder="Required Score"
        ref={test.assignInputRef.bind(test)}
      />
    );
  }
}

@observer
class RequiredScoreUnitSelect extends Component {

  render() {
    const {test, handleChange} = this.props;

    return (
      <select
        className="edit-input select"
        value={test.requiredScoreUnit}
        onChange={handleChange.bind(this, 'requiredScoreUnit')}
      >
        {Object.keys(test.requiredScoreUnitsMap).map(key => {
          return <option key={key} value={key}>
            {test.requiredScoreUnitsMap[key]}
          </option>;
        })}
      </select>
    );
  }
}

export default TestSettings;
