import { observable, action } from "mobx";

import ui from     "./ui";

import User            from "./../models/user";
import UsersCollection from "./../collections/users";

class UsersStore {

  @observable collection = new UsersCollection();
  @observable model      = new User();

  @action list() {
    this.collection.fetch();
    ui.setPageTitle("Users");
  }

  @action show(id) {
    this.model = new User();
    this.model.set('id', id);
    this.model.fetch().then(
      () => ui.setPageTitle(this.model.name)
    );
  }

  @action create() {
    this.model.save().then(
      () => {
        router.navigate('users');
      }
    );
  }

}

export default new UsersStore();
