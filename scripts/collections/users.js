import AppCollection from "./app-collection";

import User from "./../models/user";

class UsersCollection extends AppCollection {

  static get model() {
    return User;
  }

  static get urlRoot() {
    return "/v1/users";
  }

}

export default UsersCollection;
