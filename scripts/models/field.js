import { action, computed, observable } from "mobx";

import AppModel from "./app-model";

import FIELD_TYPES from "./../helpers/field-types";

class Field extends AppModel {

  @observable editor = null;

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

  @action toggleSelectedOption(uuid) {
    const option = this.options.find({ uuid: uuid });

    if (this.isSingleChoice)   this._selectSingleSelectedOption(option);
    if (this.isMultipleChoice) this._selectMultipeSelectedOption(option);
  }

  @action moveOption(dragId, hoverId) {
    this.options.move(dragId, hoverId);
  }

}

export default Field;
