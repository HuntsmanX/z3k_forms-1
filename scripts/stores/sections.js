import { observable, action } from "mobx";

import ui from     "./ui";
import router from "./router";

import ResponseSection   from "./../models/response-section";

class SectionsStore {

  @observable model = new ResponseSection();

  @action edit(id) {
    this.model.set('id', id);
    this.model.fetch()
  }

}
export default new SectionsStore();
