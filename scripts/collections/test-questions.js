import AppCollection from "./app-collection";

import TestQuestion from "./../models/test-question";

class TestQuestions extends AppCollection {}

TestQuestions.model = TestQuestion;

export default TestQuestions;
