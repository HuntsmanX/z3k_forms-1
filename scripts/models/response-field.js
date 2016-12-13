import { action, computed } from "mobx";
import Field           from "./field";
import ResponseOptions from "./../collections/response-options";

import ReviewEditor from "./review-editor";

class ResponseField extends Field {

  static get associations() {
    return {
      options: { collection: ResponseOptions, parentKey: 'field' }
    };
  }

  static get defaults() {
    return {
      isExpanded: false
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

  @computed get readOnly() {
    if (this.fieldType === "text_editor" && this.question.isBeingEdited) return false;
    return true;
  }

  @computed get maxScore() {
    if (this.fieldType !== "text_editor") return this.score;
    const max = this.score - this.editor.totalPenalty;
    return max < 0 ? 0 : max;
  }

  get isExpandable() {
    return this.question.isBeingEdited;
  }

  @action toggleExpand() {
    this.isExpanded = !this.isExpanded;
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
    if (this.fieldType === "text_editor")
      this.editor = new ReviewEditor(this.userContent);
  }

  serialize(options) {
    const data = super.serialize(options);

    if (this.fieldType === "text_editor")
      data.userContent = this.editor.serialize();

    return data;
  }

}

export default ResponseField;
