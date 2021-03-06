import AppCollection from "./app-collection";

import Test from "./../models/test";

class TestsCollection extends AppCollection {

  static get model() {
    return Test;
  }

  static get urlRoot() {
    return "/tests";
  }

}

export default TestsCollection;
