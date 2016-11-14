import AppModel from "./app-model";
import { action } from "mobx";

import TestQuestions from "./../collections/test-questions";

class TestSection extends AppModel {

  @action edit = () => {
    this.isBeingEdited = true;
  }

  @action toggle = () => {
    this.isExpanded = !this.isExpanded;
  }

  @action addQuestion = () => {
    this.questions.add({ isBeingEdited: true });
  }

}

TestSection.urls = {
  create()  { return [`/test/sections`, "POST"] },
  update()  { return [`/test/sections/${this.id}`, "PATCH"] },
  destroy() { return [`/test/sections/${this.id}`, "DELETE"] }
}

TestSection.attributes = {
  id:                   null,
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
  questions: { type: 'hasMany', klass: TestQuestions }
}

export default TestSection;
