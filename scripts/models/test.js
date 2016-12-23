import { computed, action } from "mobx";

import AppModel from "./app-model";

import TestSections from "./../collections/test-sections";

class Test extends AppModel {

  successCriteriaMap = {
    total_score: 'Total Score',
    successful_sections: 'Successful sections'
  };

  requiredScoreUnitsMap = {
    points: 'Points',
    percent: 'Percent'
  };

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
      name:             "",
      alerts:           [],
      successCriterion: 0,
      isBeingEdited:    false
    }
  }

  @computed get warnings() {
    return this.alerts.join("\n");
  }

  @computed get successCriterionLabel() {
    return this.successCriteriaMap[this.successCriterion];
  }

  @computed get requiredScoreUnitsLabel() {
    return this.requiredScoreUnitsMap[this.requiredScoreUnit];
  }

  @action addSection() {
    this.sections.add({ isBeingEdited: true });
    this.sections.last().focus();
  }

  @action edit() {
    this.set('isBeingEdited', true);
    this.focus();
  }

  @action save() {
    super.save().then(
      () => this.set('isBeingEdited', false)
    );
  }

  @action focus() {
    setTimeout(() => {
      this.inputRef && this.inputRef.focus();
    }, 0);
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

  @action assignInputRef(input) {
    this.inputRef = input;
  }

}

export default Test;
