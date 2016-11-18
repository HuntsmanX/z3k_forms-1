import AppModel from "./app-model";
import { action, observable } from "mobx";

import TestQuestions from "./../collections/test-questions";

class TestSection extends AppModel {

  @action edit() {
    this.set('isBeingEdited', true);
  }

  @action toggle() {
    this.set('isExpanded', !this.isExpanded);
  }

  @action addQuestion() {
    this.questions.add({ isBeingEdited: true });
  }

  @action save() {
    super.save().then(
      () => this.set('isBeingEdited', false)
    )
  }

}

TestSection.urlRoot = "/test/sections";

TestSection.defaults = {
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
  showNextSection:      'always',
  isBeingEdited:        false,
  isExpanded:           false
}

TestSection.associations = {
  questions: { collection: TestQuestions, parentKey: 'test' }
}

export default TestSection;
