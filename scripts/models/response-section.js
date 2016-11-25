import { computed, action } from "mobx";

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

  serialize() {
    const data = super.serialize({
      include:    { questions: { fields: ['options'] } },
      includeMap: { questions: 'questionsAttributes', fields: 'fieldsAttributes', options: 'optionsAttributes' }
    });
    return data
  }
}

export default ResponseSection;
