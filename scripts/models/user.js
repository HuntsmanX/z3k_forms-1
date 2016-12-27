import { computed } from "mobx";

import AppModel from "./app-model";

import Roles from "./../collections/roles";

class User extends AppModel {

  static get urlRoot() {
    return "/v1/users";
  }

  static get associations() {
    return {
      roles: { collection: Roles, parentKey: 'user' }
    };
  }

  static get defaults() {
    return {
      roleIds: []
    };
  }

  static get resourceKey() {
    return "staff:user";
  }

  @computed get roleNames() {
    return this.roles.map(r => r.name).join(', ');
  }

}

export default User;
