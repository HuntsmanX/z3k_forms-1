import { action, computed } from "mobx";
import sumBy from "lodash/sumBy";

import AppModel from "./app-model";

import ResponseQuestions from "./../collections/response-questions";

class ResponseSection extends AppModel {

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

  @action toggle() {
    this.set('isExpanded', !this.isExpanded);
  }

  @computed get maxScore() {
    return sumBy(this.questions.models, 'maxScore');
  }

  @computed get userScore() {
    return Math.round(sumBy(this.questions.models, 'userScore') * 100) / 100;
  }

  @computed get isSuccessful() {
    return this.userScore >= this.requiredScore;
  }

  @computed get isChecked() {
    return this.questions.every('isChecked');
  }

}

export default ResponseSection;
