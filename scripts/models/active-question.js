import { action, observable } from "mobx";

import AppModel from "./app-model";

import ActiveFields from "./../collections/active-fields";

import QuestionEditor from "./question-editor";

class ActiveQuestion extends AppModel {

  static get associations() {
    return {
      fields: { collection: ActiveFields, parentKey: 'question' }
    };
  }

  @observable editor = null;

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new QuestionEditor(this.content)
  }

  serialize(options) {
    const data = super.serialize(options);
    data.content = this.editor.serialize();
    return data;
  }

}

export default ActiveQuestion;
