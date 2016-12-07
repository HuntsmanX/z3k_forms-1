import { computed, action } from "mobx";

import Field from "./field";

import ActiveOptions from "./../collections/active-options";

import Editor from "./editor";

class ActiveField extends Field {

  static get associations() {
    return {
      options: { collection: ActiveOptions, parentKey: 'field' }
    };
  }

  @computed get availableOptions() {
    return this.options;
  }

  @action setValue(val) {
    this.set('userContent', val);
  }

  @computed get value() {
    return this.get('userContent') || "";
  }

  @action _selectSingleSelectedOption(option) {
    this.options.each(o => o.set('userSelected', false));
    option.set('userSelected', true);
  }

  @action _selectMultipeSelectedOption(option) {
    option.set('userSelected', !option.userSelected);
  }

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new Editor(this.userContent);
  }

  serialize(options) {
    const data = super.serialize(options);

    if (this.fieldType === "text_editor")
      data.userContent = this.editor.serialize();

    return data;
  }

}

export default ActiveField;
