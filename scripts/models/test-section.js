import AppModel from "./app-model";
import { action, observable, computed } from "mobx";
import humanize from "underscore.string/humanize";
import pluralize from "pluralize";
import sum from "lodash/sum";

import TestQuestions from "./../collections/test-questions";

class TestSection extends AppModel {

  static get urlRoot() {
    return "/test/sections";
  }

  static get defaults() {
    return {
      title:                'Untitled Section',
      description:          'Section description',
      timeLimit:            0,
      bonusTime:            0,
      requiredScore:        0,
      requiredScoreUnits:   'points',
      acceptableScore:      0,
      acceptableScoreUnits: 'points',
      orderIndex:           0,
      shuffleQuestions:     false,
      questionsToShow:      0,
      showNextSection:      'show_next_regardless_of_score',
      isBeingEdited:        false,
      isExpanded:           false
    };
  }

  static get associations() {
    return {
      questions: { collection: TestQuestions, parentKey: 'section' }
    };
  }

  scoreUnitsMap = {
    points:  'Points',
    percent: 'Percent'
  }

  showNextSectionMap = {
    show_next_regardless_of_score: 'Regardless of Score',
    show_next_depending_of_score:  'Score is Acceptable'
  }

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

  @computed get shuffleQuestionsIcon() {
    return this.shuffleQuestions ? "done" : "block";
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

    if (this.acceptableScore > this.maxAutoScore && this.acceptableScoreUnits === 'points')
      ret.push('Acceptable autoscore is larger than max autoscore');

    return ret.join("\n");
  }

  @computed get formattedErrors() {
    return this.errors.entries().map(entry => {
      return `${humanize(entry[0])} ${entry[1].join(', ')}`;
    }).join("\n");
  }

  @action toggleShuffleQuestions() {
    this.set('shuffleQuestions', !this.shuffleQuestions);
  }

  @action edit() {
    this.set('isBeingEdited', true);
    this.focus();
  }

  @action toggle() {
    this.set('isExpanded', !this.isExpanded);
  }

  @action addQuestion() {
    this.questions.add({ isBeingEdited: true });
    this.questions.last().focus();
  }

  @action moveQuestion(dragId, hoverId) {
    this.questions.move(dragId, hoverId, { persistOrder: true });
  }

  @action deleteQuestion(uuid) {
    const question = this.questions.find({ uuid: uuid });
    if (question.isNew) return this.questions.remove(uuid);

    if (confirm(`Are you sure you want to delete this question?`))
      question.destroy().then(() => this.questions.remove(uuid, { persistOrder: true }));
  }

  @action save() {
    super.save().then(
      () => this.set('isBeingEdited', false)
    )
  }

  @action assignInputRef(input) {
    this.inputRef = input;
  }

  @action focus() {
    setTimeout(() => {
      this.inputRef && this.inputRef.focus();
    }, 0);
  }

}

export default TestSection;
