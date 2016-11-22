import { computed, action } from "mobx";

import AppModel from "./app-model";

class TestOption extends AppModel {

  static get defaults() {
    return {
      content:    "",
      isCorrect:  false,
      orderIndex: 0,
      _destroy:   false
    };
  }

  @computed get isSelected() {
    return this.isCorrect;
  }

  @action assignInputRef(input) {
    this.inputRef = input;
  }

  @action focus() {
    setTimeout(() => {
      this.inputRef && this.inputRef.focus()
    }, 0);
  }

}

export default TestOption;
