import { observable, action } from "mobx";

import ui from     "./ui";
import router from "./router";

import Response            from "./../models/response";
import ResponsesCollection from "./../collections/responses";
import TestsCollection     from "./../collections/tests";

class ResponseStore {

  @observable collection = new ResponsesCollection();
  @observable model      = new Response();

  @action showNew() {
    this.model = new Response();
    ui.setPageTitle("New Response");
  }

  @action list() {
    this.collection.fetch();
    ui.setPageTitle("Responses");
  }

  @action create() {
    this.model.save().then(
      () => router.navigate('start', { id: this.model.id })
    );
  }

  @action show(id) {
    this.model.set('id', id);
    this.model.fetch().then(
      () => ui.setPageTitle(this.model.name)
    );
  }

  @action start(id) {
    this.model.set('id', id);
    this.model.fetch().then(
      () => ui.setPageTitle(this.model.name)
    );
  }

}

export default new ResponseStore();
