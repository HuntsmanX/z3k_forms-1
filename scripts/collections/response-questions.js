import AppCollection from "./app-collection";

import ResponseQuestion from "./../models/response-question";

class ResponseQuestions extends AppCollection {

  static get model() {
    return ResponseQuestion;
  }

}

export default ResponseQuestions;
