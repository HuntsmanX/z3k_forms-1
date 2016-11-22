import { action, computed, observable } from "mobx";
import humanize from "underscore.string/humanize";

import AppModel from "./app-model";
import Editor   from "./editor";

import TestOptions from "./../collections/test-options";

import FIELD_TYPES from "./../helpers/field-types";

class TestField extends AppModel {

  static get defaults() {
    return {
      content:   "",
      score:     1,
      autocheck: false,
      _destroy:  false
    };
  }

  static get associations() {
    return {
      options: { collection: TestOptions, parentKey: 'test' }
    };
  }

  @observable editor = null;

  initialize() {
    if (this.isPersisted || !this.hasOptions) return;

    this.options.add([
      { content: 'Option 1', isCorrect: true },
      { content: 'Option 2', isCorrect: false }
    ]);
  }

  @computed get availableOptions() {
    return this.options.notMarkedForDestruction;
  }

  @computed get value() {
    return this.get('content');
  }

  @computed get readOnly() {
    if (this.fieldType === 'text_editor') return true;
    return !this.question.isBeingEdited;
  }

  @computed get formattedErrors() {
    return this.errors.entries().map(entry => {
      return `${humanize(entry[0])} ${entry[1].join(', ')}`;
    }).join("\n");
  }

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new Editor(this.content);
  }

  serialize(options) {
    const data = super.serialize(options);

    if (this.fieldType === "text_editor")
      data.content = this.editor.serialize();

    return data;
  }

  @action setValue(val) {
    this.set('content', val);
  }

  @action toggleAutocheck() {
    this.set('autocheck', !this.autocheck);
  }

  @action addOption() {
    this.options.add();
    this.options.last().focus();
  }

  @action deleteOption(uuid) {
    this.options.markForDestruction(uuid);
  }

  @action moveOption(dragId, hoverId) {
    this.options.move(dragId, hoverId);
  }

  @action toggleSelectedOption(uuid) {
    const option = this.options.find({ uuid: uuid });

    if (this.isSingleChoice)   this._selectSingleSelectedOption(option);
    if (this.isMultipleChoice) this._selectMultipeSelectedOption(option);
  }

  @action _selectSingleSelectedOption(option) {
    this.options.each(o => o.set('isCorrect', false));
    option.set('isCorrect', true);
  }

  @action _selectMultipeSelectedOption(option) {
    option.set('isCorrect', !option.isCorrect);
  }

  @computed get fieldEntity() {
    return FIELD_TYPES.find(f => f.name === this.fieldType)
  }

  @computed get label() {
    return this.fieldEntity.label;
  }

  @computed get tooltip() {
    return this.fieldEntity.tooltip;
  }

  @computed get hasOptions() {
    return this.fieldEntity.hasOptions;
  }

  @computed get hasCorrectOptions() {
    if (!this.autocheck) return false;
    return this.fieldEntity.hasCorrectOptions;
  }

  @computed get isSingleChoice() {
    return this.fieldEntity.choice === 'single';
  }

  @computed get isMultipleChoice() {
    return this.fieldEntity.choice === 'multiple';
  }

}

export default TestField;
