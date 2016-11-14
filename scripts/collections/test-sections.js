import AppCollection from "./app-collection";

import TestSection from "./../models/test-section";

class TestSectionsCollection extends AppCollection {}

TestSectionsCollection.model = TestSection;

export default TestSectionsCollection;
