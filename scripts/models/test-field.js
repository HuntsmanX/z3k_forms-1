import { action, computed } from "mobx";
import humanize from "underscore.string/humanize";

import Field       from "./field";
import TestOptions from "./../collections/test-options";

class TestField extends Field {

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

  @computed get readOnly() {
    if (this.fieldType === 'text_editor') return true;
    return !this.question.isBeingEdited;
  }

  @computed get formattedErrors() {
    return this.errors.entries().map(entry => {
      return `${humanize(entry[0])} ${entry[1].join(', ')}`;
    }).join("\n");
  }

  @action _selectSingleSelectedOption(option) {
    this.options.each(o => o.set('isCorrect', false));
    option.set('isCorrect', true);
  }

  @action _selectMultipeSelectedOption(option) {
    option.set('isCorrect', !option.isCorrect);
  }

  serialize(options) {
    const data = super.serialize(options);

    if (this.fieldType === "text_editor")
      data.content = this.editor.serialize();

    return data;
  }

}

export default TestField;
