import { action, computed } from "mobx";
import camelCase from "lodash/camelCase";

import AppModel from "./app-model";

class Permission extends AppModel {

  @action toggleAllowed() {
    this.allowed = !this.allowed;
  }

  @action setCondition(attr, value) {
    this.conditions[camelCase(attr)] = value;
  }

  getCondition(attr) {
    return computed(
      () => this.conditions[camelCase(attr)]
    ).get();
  }

}

export default Permission;
