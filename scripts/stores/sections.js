import { observable, action } from "mobx";
import isUndefined from "lodash/isUndefined";

import ui from     "./ui";
import router from "./router";

import ResponseSection   from "./../models/response-section";
import Timer             from "./../models/timer";

class SectionsStore {

  @observable loading = false;
  @observable model   = new ResponseSection();
  @observable timer   = new Timer();

  @action setLoading(val){
    this.loading = val;
  }

  @action edit(id) {
    this.model.set('id', id);
    this.setLoading(true);
    this.model.fetch().then(
      () => {
        this.timer.start(this.model, this);
        this.setLoading(false);
      }
    );
  }

  @action updateSection(section) {
    this.setLoading(true);
    section.save().then(
      ({ data }) => {
        isUndefined(data) ? router.navigate('finish') : this.edit(data.uuid);
      }
    );
  }

}

export default new SectionsStore();
