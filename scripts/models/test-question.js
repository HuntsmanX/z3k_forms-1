import { observable, action, computed } from "mobx";
import sumBy from "lodash/sumBy";
import humanize from "underscore.string/humanize";

import AppModel       from "./app-model";
import QuestionEditor from "./question-editor";

import TestFields from "./../collections/test-fields";

class TestQuestion extends AppModel {

  static get urlRoot() {
    return "/test/questions";
  }

  static get defaults() {
    return {
      content:       "",
      orderIndex:    0,
      isBeingEdited: false,
      fieldActive:   false
    };
  }

  static get associations() {
    return {
      fields: { collection: TestFields, parentKey: 'question' }
    };
  }

  @observable editor = null;

  @computed get readOnly() {
    return !this.isBeingEdited || this.fieldActive;
  }

  @computed get availableFields() {
    return this.fields.notMarkedForDestruction;
  }

  @computed get maxScore() {
    return sumBy(this.availableFields, 'score');
  }

  @computed get autoScore() {
    return sumBy(
      this.availableFields.filter(f => f.autocheck), 'score'
    );
  }

  @computed get manualScore() {
    return sumBy(
      this.availableFields.filter(f => !f.autocheck), 'score'
    );
  }

  @computed get formattedErrors() {
    return this.errors.entries().map(entry => {
      return `${humanize(entry[0])} ${entry[1].join(', ')}`;
    }).join("\n");
  }

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new QuestionEditor(
      this.content, this._checkRemovedFields.bind(this)
    );
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

  serialize() {
    const data = super.serialize({
      include:    { fields: 'options' },
      includeMap: { fields: 'fieldsAttributes', options: 'optionsAttributes' }
    });
    data.content = this.editor.serialize();
    return data;
  }

  @action setErrors(errors) {
    const errorKeys = Object.keys(errors).filter(attr => !/^fields/.test(attr))
    errorKeys.forEach(key => this.errors.set(key, errors[key]));

    errors.fields && errors.fields.forEach(
      f => this.fields.find({ blockKey: f.blockKey }).setErrors(f.errors)
    );
  }

  @action unsetErrors() {
    this.errors.clear();
    this.fields.each(field => field.unsetErrors());
  }

  @action insertField(type) {
    const fieldBlockKey = this.editor.insertField(type);
    this.fields.add({ fieldType: type, blockKey: fieldBlockKey });
  }

  @action _checkRemovedFields() {
    this.fields.forEach(field => {
      if (!this.editor.isBlockPresent(field.blockKey)) field.markForDestruction();
    });
  }

  @action assignInputRef(input) {
    this.inputRef = input;
  }

  @action focus() {
    setTimeout(() => {
      this.inputRef && this.inputRef.focus();
    }, 0);
  }

}

export default TestQuestion;
