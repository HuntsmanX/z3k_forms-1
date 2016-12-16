import { computed, action, observable } from "mobx";
import AppModel from "./app-model";
import { Entity } from "draft-js";
import Users from "./../collections/users";

class Role extends AppModel {

  static get urlRoot() {
    return "/roles";
  }

  static get associations() {
    return {
      users: { collection: Users, parentKey: 'role' }
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

  serialize(options) {
    const data = super.serialize(options);
    data.userIds = this.users.serialize().map((u) => {return u.id});
    return data;
  }

}

export default Role;
