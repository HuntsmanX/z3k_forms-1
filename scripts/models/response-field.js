import { action, computed, observable } from "mobx";
import humanize from "underscore.string/humanize";

import AppModel from "./app-model";
import Editor   from "./editor";
import ResponseOptions from "./../collections/response-options";

import FIELD_TYPES from "./../helpers/field-types";

class ResponseField extends AppModel {

  static get associations() {
    return {
      options: { collection: ResponseOptions, parentKey: 'test' }
    };
  }

  @observable editor = null;

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new Editor(this.content);
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

  @action toggleSelectedOption(uuid) {
    const option = this.options.find({ uuid: uuid });

    if (this.isSingleChoice)   this._selectSingleSelectedOption(option);
    if (this.isMultipleChoice) this._selectMultipeSelectedOption(option);
  }

  @action _selectSingleSelectedOption(option) {
    this.options.each(o => o.set('userSelected', false));
    option.set('userSelected', true);
  }

  @action _selectMultipeSelectedOption(option) {
    option.set('userSelected', !option.userSelected);
  }

  @computed get isSingleChoice() {
    return this.fieldEntity.choice === 'single';
  }

  @computed get isMultipleChoice() {
    return this.fieldEntity.choice === 'multiple';
  }

  @computed get fieldEntity() {
    return FIELD_TYPES.find(f => f.name === this.fieldType)
  }

  @action moveOption(dragId, hoverId) {
    this.options.move(dragId, hoverId);
  }

}
export default ResponseField;
