import { action } from "mobx";

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

}

export default ResponseSection;
