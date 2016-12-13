import { action, computed } from "mobx";
import sum from "lodash/sum";

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

  @computed get userScore() {
    return Math.round(sum([].concat.apply([], this.questions.map(q => q.fields.map( f => f.userScore))))* 100) / 100
  }

  @computed get isPassed() {
    if((this.userScore >= this.requiredScore) && this.userScore != 0) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

}

export default ResponseSection;
