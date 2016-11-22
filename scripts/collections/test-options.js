import AppCollection from "./app-collection";

import TestOption from "./../models/test-option";

class TestOptions extends AppCollection {

  static get model() {
    return TestOption;
  }

}

export default TestOptions;
