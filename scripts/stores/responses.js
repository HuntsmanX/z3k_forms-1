import { observable, action } from "mobx";

import ui from     "./ui";
import router from "./router";

import Response            from "./../models/response";
import ResponsesCollection from "./../collections/responses";

class ResponseStore {

  @observable collection = new ResponsesCollection();
  @observable model      = new Response();

  @observable newResponseShown = false;

  @action showNew(val) {
    if (val) this.model = new Response();
    this.newResponseShown = val;
  }

  @action list() {
    this.collection.fetch();
    ui.setPageTitle("Responses");
  }

  @action show(id) {
    this.model.set('id', id);
    this.model.fetch().then(
      () => ui.setPageTitle(this.model.name)
    );
  }

}

export default new ResponseStore();
