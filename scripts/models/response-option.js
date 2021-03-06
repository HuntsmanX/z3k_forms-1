import { computed, action } from "mobx";

import AppModel from "./app-model";

class ResponseOption extends AppModel {

  @computed get isSelected() {
    return this.userSelected || false;
  }

}

export default ResponseOption;
