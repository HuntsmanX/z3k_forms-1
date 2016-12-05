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

  @action initialize() {
    if (this.fieldType !== "dropdown" && this.fieldType !== "inline_dropdown") return;

    this.options.add({ content: 'Please select', _destroy: true });
    this.options.move(this.options.last().uuid, this.options.first().uuid);

    if (this.options.find({ userSelected: true })) return;

    this.options.find({ content: "Please select", _destroy: true }).set('userSelected', true);
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
