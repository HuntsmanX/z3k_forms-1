import AppCollection from "./app-collection";

import TestQuestion from "./../models/test-question";

class TestQuestions extends AppCollection {

  static get model() {
    return TestQuestion;
  }

  static get urlRoot() {
    return "/v1/forms/test/questions";
  }

}

export default TestQuestions;
