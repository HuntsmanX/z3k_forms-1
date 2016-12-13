import { observable, action } from "mobx";

import ui from     "./ui";
import router from "./router";

import Test            from "./../models/test";
import TestsCollection from "./../collections/tests";

class TestsStore {

  @observable collection = new TestsCollection();
  @observable model      = new Test();

  @observable newTestShown = false;

  @action showNew(val) {
    if (val) this.model = new Test();
    this.newTestShown = val;
  }

  @action list() {
    this.collection.fetch();
    ui.setPageTitle("Tests");
  }

  @action show(id) {
    this.model = new Test();
    this.model.set('id', id);
    this.model.fetch().then(
      () => ui.setPageTitle(this.model.name)
    );
  }

  @action create() {
    this.model.save().then(
      () => {
        this.showNew(false);
        router.navigate('editTest', { id: this.model.id });
      }
    );
  }

  @action destroy(id) {
    const model = this.collection.find({ id: id });

    if (confirm(`Are you sure you want to delete '${model.name}' test?`))
      model.destroy().then(this.list.bind(this));
  }

}

export default new TestsStore();
