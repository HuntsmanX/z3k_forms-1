import { observable, action } from "mobx";

import ui from     "./ui";
import router from "./router";

import Response            from "./../models/response";
import ResponsesCollection from "./../collections/responses";
import TestsCollection     from "./../collections/tests";

class ResponseStore {

  @observable collection = new ResponsesCollection();
  @observable model      = new Response();
  @observable tests      = new TestsCollection();
  @observable loading    = false;

  @action setLoading(val) {
    this.loading = val;
  }

  @action showNew() {
    this.model = new Response();
    this.setLoading(true);
    this.tests.fetch().then(
      () => this.setLoading(false)
    )
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
  }

  @action editSection(uuid){
    router.navigate('editResponseSection', { id: uuid })
  }


}

export default new ResponseStore();
