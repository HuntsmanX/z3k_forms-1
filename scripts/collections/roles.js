import AppCollection from "./app-collection";

import Role from "./../models/role";

class RolesCollection extends AppCollection {

  static get model() {
    return Role;
  }

  static get urlRoot() {
    return "/roles";
  }

}

export default RolesCollection;
