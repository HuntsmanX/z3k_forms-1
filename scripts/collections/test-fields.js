import AppCollection from "./app-collection";

import TestField from "./../models/test-field";

class TestFields extends AppCollection {}

TestFields.model = TestField;

export default TestFields;
