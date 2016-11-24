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
}

export default ResponseSection;
