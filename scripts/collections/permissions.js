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

  @computed get groupedByRole() {
    return this.groupBy(function (o) {
      return o.role.name
    });
  }

}

export default PermissionsCollection;
