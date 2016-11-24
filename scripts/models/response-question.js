import { observable, action, computed } from "mobx";

import AppModel       from "./app-model";
import ResponseFields from "./../collections/response-fields";
import QuestionEditor from "./question-editor";

class ResponseQuestion extends AppModel {

  static get associations() {
    return {
      fields: { collection: ResponseFields, parentKey: 'question' }
    };
  }

  @observable editor = null;

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new QuestionEditor(this.content)
  }

  @action focus() {
    setTimeout(() => {
      this.inputRef && this.inputRef.focus();
    }, 0);
  }

  @action assignInputRef(input) {
    this.inputRef = input;
  }


}
export default ResponseQuestion;
