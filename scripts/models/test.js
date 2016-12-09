import { computed, action } from "mobx";

import AppModel from "./app-model";

import TestSections from "./../collections/test-sections";

class Test extends AppModel {

  static get urlRoot() {
    return "/tests";
  }

  static get associations() {
    return {
      sections: { collection: TestSections, parentKey: 'test' }
    };
  }

  static get defaults() {
    return {
      name: ""
    }
  }

  @computed get warnings() {
    var ret = [];
    this.sections.forEach( s => ret = _.union(ret ,s.warnings.split("\n")));

    return ret.join("\n");
  }

  @action addSection() {
    this.sections.add({ isBeingEdited: true });
    this.sections.last().focus();
  }

  @action moveSection(dragId, hoverId) {
    this.sections.move(dragId, hoverId, { persistOrder: true });
  }

  @action deleteSection(uuid) {
    const section = this.sections.find({ uuid: uuid });
    if (section.isNew) return this.sections.remove(uuid);

    if (confirm(`Are you sure you want to delete '${section.title}' section?`))
      section.destroy().then(() => this.sections.remove(uuid, { persistOrder: true }));
  }

}

export default Test;
