import { action, computed, observable } from "mobx";

import AppModel from "./app-model";
import Editor   from "./editor";

import TestOptions from "./../collections/test-options";

import FIELD_TYPES from "./../helpers/field-types";

class TestField extends AppModel {

  @observable editor = null;

  initialize() {
    if (this.isPersisted || !this.hasOptions) return;

    this.options.add([
      { content: 'Option 1', isCorrect: true },
      { content: 'Option 2', isCorrect: false }
    ]);
  }

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new Editor(this.content);
  }

  serialize() {
    const data = super.serialize();

    if (this.fieldType === "text_editor")
      data.content = this.editor.serialize();

    return data;
  }

  @computed get value() {
    return this.get('content');
  }

  @action setValue(val) {
    this.set('content', val);
  }

  @action toggleAutocheck() {
    this.set('autocheck', !this.autocheck);
  }

  @action addOption() {
    this.options.add()
  }

  @action deleteOption(uuid) {
    console.log(this.options.find({ uuid: uuid }))
  }

  @action toggleCorrectOption(uuid) {
    console.log(this.options.find({ uuid: uuid }))
  }

  @computed get readOnly() {
    if (this.fieldType === 'text_editor') return true;
    return !this.question.isBeingEdited;
  }

  @computed get label() {
    return FIELD_TYPES.find(f => f.name === this.fieldType).label;
  }

  @computed get tooltip() {
    return FIELD_TYPES.find(f => f.name === this.fieldType).tooltip;
  }

  @computed get hasOptions() {
    return FIELD_TYPES.find(f => f.name === this.fieldType).hasOptions;
  }

  @computed get hasCorrectOptions() {
    if (!this.autocheck) return false;
    return FIELD_TYPES.find(f => f.name === this.fieldType).hasCorrectOptions;
  }

}

TestField.defaults = {
  content:    "",
  score:      1,
  autocheck:  false,
}

TestField.associations = {
  options: { collection: TestOptions, parentKey: 'test' }
}

export default TestField;
