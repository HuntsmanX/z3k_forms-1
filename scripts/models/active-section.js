import { computed } from "mobx";

import AppModel        from "./app-model";

import ActiveQuestions from "./../collections/active-questions";

class ActiveSection extends AppModel {

  static get urlRoot() {
    return "/response/sections";
  }

  static get associations() {
    return {
      questions: { collection: ActiveQuestions, parentKey: 'section' }
    };
  }

  serialize() {
    return super.serialize({
      include:    { questions: { fields: 'options' } },
      includeMap: { questions: 'questionsAttributes', fields: 'fieldsAttributes', options: 'optionsAttributes' }
    });
  }

  @computed get isTimeLimited() {
    return this.timeLimit > 0;
  }

}

export default ActiveSection;
