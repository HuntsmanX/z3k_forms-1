import { computed, action } from "mobx";

import AppModel from "./app-model";

import TestSections from "./../collections/test-sections";

class Test extends AppModel {

  @action addSection() {
    this.sections.add({ isBeingEdited: true });
  }

}

Test.urlRoot = "/tests";

Test.associations = {
  sections: { collection: TestSections, parentKey: 'test' }
}

export default Test;
