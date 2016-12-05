import AppCollection from "./app-collection";

import ActiveQuestion from "./../models/active-question";

class ActiveQuestions extends AppCollection {

  static get model() {
    return ActiveQuestion;
  }

}

export default ActiveQuestions;
