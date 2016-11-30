import { observable, action, computed } from "mobx";
import { sumBy } from "lodash";
import humanize from "underscore.string/humanize";

import AppModel       from "./app-model";
import ResponseFields from "./../collections/response-fields";
import QuestionEditor from "./question-editor";

class ResponseQuestion extends AppModel {

  static get urlRoot() {
    return "/response/questions";
  }

  static get associations() {
    return {
      fields: { collection: ResponseFields, parentKey: 'question' }
    };
  }

  static get defaults() {
    return {
      isBeingEdited: false
    };
  }

  @observable editor = null;

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new QuestionEditor(this.content)
  }

  @computed get isChecked() {
    return this.fields.every('checked')
  }

  @computed get userScore() {
    return sumBy(this.availableFields, 'userScore')
  }

  @computed get userResultPercentage() {
    const userScore = this.userScore || 0;
    const maxScore = this.maxScore || 0;
    return Math.round(userScore * 100 / maxScore)
  }

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
    const errorKeys = Object.keys(errors).filter(attr => !/^fields/.test(attr));
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

  @action assignInputRef(input) {
    this.inputRef = input;
  }

  @action focus() {
    setTimeout(() => {
      this.inputRef && this.inputRef.focus();
    }, 0);
  }

}

export default ResponseQuestion;
