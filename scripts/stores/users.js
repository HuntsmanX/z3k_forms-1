import { observable, action } from "mobx";

import ui     from "./ui";
import router from "./router";

import User            from "./../models/user";
import UsersCollection from "./../collections/users";

class UsersStore {

  @observable collection = new UsersCollection();
  @observable model      = new User();

  @observable editUserShown = false;

  @action list() {
    this.collection.fetch();
    ui.setPageTitle("Users");
  }

  @action showEdit(val) {
    this.editUserShown = val;
  }

  @action edit(id) {
    this.model = this.collection.find({ id: id });
    this.showEdit(true);
  }

  @action update() {
    this.model.save().then(
      () => this.showEdit(false)
    );
  }

}

export default new UsersStore();
