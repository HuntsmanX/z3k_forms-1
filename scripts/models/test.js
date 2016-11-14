import { computed, action } from "mobx";

import AppModel from "./app-model";

import TestSections from "./../collections/test-sections";


class Test extends AppModel {

  @action addSection = () => {
    this.sections.add({ isBeingEdited: true });
  }

}

Test.urls = {
  fetch()   { return [`/tests/${this.id}`, "GET"] },
  create()  { return ["/tests",            "POST"] },
  update()  { return [`/tests/${this.id}`, "PATCH"] },
  destroy() { return [`/tests/${this.id}`, "DELETE"] }
}

Test.attributes = {
  id:   null,
  name: ''
}

Test.associations = {
  sections: { type: 'hasMany', klass: TestSections }
}

export default Test;
