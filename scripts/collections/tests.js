import AppCollection from "./app-collection";

import Test from "./../models/test";

class TestsCollection extends AppCollection {}

TestsCollection.model = Test;

TestsCollection.urls = {
  fetch: "/tests"
}

export default TestsCollection;
