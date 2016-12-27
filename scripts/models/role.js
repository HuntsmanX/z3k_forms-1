import AppModel from "./app-model";

import Permissions from "./../collections/permissions";

class Role extends AppModel {

  static get urlRoot() {
    return "/v1/roles";
  }

  static get associations() {
    return {
      permissions: { collection: Permissions, parentKey: 'role' }
    };
  }

  static get defaults() {
    return {
      name: ""
    };
  }

  static get resourceKey() {
    return "staff:role";
  }

  get identifier() {
    return `role-${this.id}`;
  }

  serialize() {
    return super.serialize({
      include: 'permissions',
      includeMap: { permissions: 'permissionsAttributes' }
    });
  }

}

export default Role;
