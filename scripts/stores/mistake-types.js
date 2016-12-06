import { observable, action } from "mobx";

import ui from     "./ui";
import router from "./router";

import MistakeType            from "./../models/mistake-type";
import MistakeTypesCollection from "./../collections/mistake-types";

class MistakeTypesStore {

  @observable collection = new MistakeTypesCollection();
  @observable model      = new MistakeType();

  @observable mistakeTypeShown = false;

  @action showNew(val) {
    if (val) this.model = new MistakeType();
    this.showModal(val)
  }

  @action list() {
    this.collection.fetch();
    ui.setPageTitle("MistakeTypes");
  }

  @action show(id) {
    this.model.set('id', id);
    this.model.fetch().then(
      () => this.showModal(true)
    );
  }

  @action showModal(val) {
    this.mistakeTypeShown = val;
  }

  @action create() {
    this.model.save().then(
      () => {
        this.showNew(false);
        router.navigate('mistakeTypes');
      }
    );
  }

  @action destroy(id) {
    const model = this.collection.find({ id: id });

    if (confirm(`Are you sure you want to delete '${model.name}' mistake type?`))
      model.destroy().then(this.list.bind(this));
  }

}

export default new MistakeTypesStore();
