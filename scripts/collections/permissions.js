import { computed } from "mobx";

import AppCollection from "./app-collection";

import Permission from "./../models/permission";

class PermissionsCollection extends AppCollection {

  static get model() {
    return Permission;
  }

  @computed get grouped() {
    return this.groupBy('resourceName');
  }

}

export default PermissionsCollection;
