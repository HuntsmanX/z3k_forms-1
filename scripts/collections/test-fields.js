import AppCollection from "./app-collection";

import TestField from "./../models/test-field";

class TestFields extends AppCollection {

  static get model() {
    return TestField;
  }

}

export default TestFields;
