import AppCollection from "./app-collection";

import TestQuestion from "./../models/test-question";

class TestQuestions extends AppCollection {

  static get model() {
    return TestQuestion;
  }

  static get urlRoot() {
    return "/test/questions";
  }

}

export default TestQuestions;
