import AppModel from "./app-model";

class TestOption extends AppModel {}

TestOption.defaults = {
  content:    "",
  isCorrect:  false,
  orderIndex: 0
}

export default TestOption;
