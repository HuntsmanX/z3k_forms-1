import AppModel from "./app-model";

class TestQuestion extends AppModel {}

TestQuestion.attributes = {
  id:            null,
  content:       'Untitled question',
  isBeingEdited: false
}

export default TestQuestion;
