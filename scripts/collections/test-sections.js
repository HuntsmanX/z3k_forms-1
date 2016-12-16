import AppCollection from "./app-collection";

import TestSection from "./../models/test-section";

class TestSectionsCollection extends AppCollection {

  static get model() {
    return TestSection;
  }

  static get urlRoot() {
    return "/v1/forms/test/sections";
  }

}

export default TestSectionsCollection;
