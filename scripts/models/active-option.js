import { computed } from "mobx";

import AppModel from "./app-model";

class ActiveOption extends AppModel {

  static get defaults() {
    return {
      userSelected: false
    };
  }

  @computed get isSelected() {
    return this.userSelected;
  }

}

export default ActiveOption;
