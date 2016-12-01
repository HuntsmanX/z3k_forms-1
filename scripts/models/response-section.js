import { action, observable, computed } from "mobx";
import humanize from "underscore.string/humanize";
import pluralize from "pluralize";
import sum from "lodash/sum";

import AppModel          from "./app-model";
import ResponseQuestions from "./../collections/response-questions";


class ResponseSection extends AppModel {

  static get urlRoot() {
    return "/response/sections";
  }

  static get associations() {
    return {
      questions: { collection: ResponseQuestions, parentKey: 'section' }
    };
  }

  static get defaults() {
    return {
      isExpanded: false
    }
  }

  serialize() {
    const data = super.serialize({
      include:    { questions: { fields: ['options'] } },
      includeMap: { questions: 'questionsAttributes', fields: 'fieldsAttributes', options: 'optionsAttributes' }
    });
    return data;
  }

  scoreUnitsMap = {
    points:  'Points',
    percent: 'Percent'
  };

  showNextSectionMap = {
    show_next_regardless_of_score: 'Regardless of Score',
    show_next_depending_of_score:  'Score is Acceptable'
  };

  @computed get questionsToShowLabel() {
    if (!this.questionsToShow) return 'All';
    return this.questionsToShow;
  }

  @computed get timeLimitLabel() {
    if (!this.timeLimit) return 'None';
    return `${this.timeLimit} ${pluralize('minute', this.timeLimit)}`;
  }

  @computed get bonusTimeRequired() {
    return !!this.timeLimit && this.timeLimit != '0';
  }

  @computed get bonusTimeLabel() {
    if (!this.bonusTime) return 'None';
    return `${this.bonusTime} ${pluralize('minute', this.bonusTime)}`;
  }

  @computed get maxScoreLabel() {
    return `${this.maxScore} (${this.maxAutoScore} auto / ${this.maxManualScore} manually)`;
  }

  @computed get maxScore() {
    return sum(this.questions.map('maxScore'));
  }

  @computed get maxAutoScore() {
    return sum(this.questions.map('autoScore'));
  }

  @computed get maxManualScore() {
    return sum(this.questions.map('manualScore'));
  }

  @computed get requiredScoreUnitsLabel() {
    return this.scoreUnitsMap[this.requiredScoreUnits];
  }

  @computed get showNextSectionLabel() {
    return this.showNextSectionMap[this.showNextSection];
  }

  @computed get acceptableScoreRequired() {
    return this.showNextSection === 'score';
  }

  @computed get acceptableScoreUnitsLabel() {
    return this.scoreUnitsMap[this.acceptableScoreUnits];
  }

  @computed get warnings() {
    var ret = [];

    if (!this.isExpanded && this.questions.find('isBeingEdited'))
      ret.push('This section has unsaved questions');

    if (this.requiredScore > this.maxScore && this.requiredScoreUnits === 'points')
      ret.push('Required score is larger than max score');

    if (this.acceptableScore > this.maxManualScore && this.acceptableScoreUnits === 'points')
      ret.push('Acceptable autoscore is larger than max autoscore');

    return ret.join("\n");
  }

  @computed get formattedErrors() {
    return this.errors.entries().map(entry => {
      return `${humanize(entry[0])} ${entry[1].join(', ')}`;
    }).join("\n");
  }

  @action toggle() {
    this.set('isExpanded', !this.isExpanded);
  }

  @computed get isTimeLimited() {
    return this.timeLimit > 0;
  }

}

export default ResponseSection;
