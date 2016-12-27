import { observable, action } from "mobx";

import ui     from "./ui";
import router from "./router";

import Role            from "./../models/role";
import RolesCollection from "./../collections/roles";

class RolesStore {

  @observable collection = new RolesCollection();
  @observable model      = new Role();

  @observable newRoleShown = false;

  @action showNew(val) {
    if (val) this.model.clear();
    this.showModal(val);
  }

  @action list() {
    this.collection.fetch();
    ui.setPageTitle("Roles");
  }

  @action show(id) {
    this.model.clear();
    this.model.set('id', id);
    this.model.fetch().then(
      () => ui.setPageTitle(this.model.name)
    );
  }

  @action showModal(val) {
    this.newRoleShown = val;
  }

  @action create() {
    this.model.save().then(
      () => {
        this.showNew(false);
        this.collection.fetch();
      }
    );
  }

  @action update() {
    this.model.save().then(
      () => router.navigate('roles')
    )
  }

  @action destroy(id) {
    const model = this.collection.find({ id: id });

    if (confirm(`Are you sure you want to delete '${model.name}' role?`))
      model.destroy().then(this.list.bind(this));
  }

}

export default new RolesStore();
