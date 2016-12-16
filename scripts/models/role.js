import { computed, action, observable } from "mobx";
import AppModel from "./app-model";
import { Entity } from "draft-js";
import Users from "./../collections/users";
import Permissions from "./../collections/permissions";

class Role extends AppModel {

  static get urlRoot() {
    return "/roles";
  }

  static get associations() {
    return {
      users: { collection: Users, parentKey: 'role' },
      permissions: { collection: Permissions, parentKey: 'role' }
    };
  }

  static get defaults() {
    return {
      name:    "",
      userIds: []
    };
  }

  get identifier() {
    return `role-${this.id}`;
  }

  serialize() {
    const data = super.serialize({ include: 'permissions', includeMap: { permissions: 'permissionsAttributes' } });
    data.userIds = this.users.serialize().map(u => u.id);
    return data;
  }

}

export default Role;
