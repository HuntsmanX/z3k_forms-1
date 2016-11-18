import { observable, action, computed } from "mobx";

import AppModel       from "./app-model";
import QuestionEditor from "./question-editor";

import TestFields from "./../collections/test-fields";

class TestQuestion extends AppModel {

  @observable editor = null;

  @computed get readOnly() {
    return !this.isBeingEdited || this.fieldActive;
  }

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new QuestionEditor(this.content, () => {});
  }

  @action edit() {
    this.set('isBeingEdited', true);
  }

  @action save() {
    // super.save().then(
    //   () => this.set('isBeingEdited', false)
    // );
    this.set('isBeingEdited', false);
  }

  serialize() {
    const data = super.serialize({
      include:    { fields: 'options' },
      includeMap: { fields: 'fieldsAttributes', options: 'optionsAttributes' }
    });
    data.content = this.editor.serialize();
    return data;
  }

  @action insertField(type) {
    const fieldBlockKey = this.editor.insertField(type);
    this.fields.add({ fieldType: type, blockKey: fieldBlockKey });
  }

}

TestQuestion.urlRoot = "/test/questions";

TestQuestion.defaults = {
  content:       "",
  orderIndex:    0,
  isBeingEdited: false,
  fieldActive:   false
}

TestQuestion.associations = {
  fields: { collection: TestFields, parentKey: 'question' }
}

export default TestQuestion;
