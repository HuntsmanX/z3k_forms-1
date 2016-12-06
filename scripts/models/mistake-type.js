import { computed, action } from "mobx";

import AppModel from "./app-model";

class MistakeType extends AppModel {

  static get urlRoot() {
    return "/config/mistake_types";
  }

  static get defaults() {
    return {
      color: ""
    };
  }
}

export default MistakeType;
