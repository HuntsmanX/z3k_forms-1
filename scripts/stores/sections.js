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
    if (localStorage.getItem("sectionId") != id ) localStorage.setItem('currentTime', 0); 
    this.model.set('id', id);
    this.setLoading(true);
    this.model.fetch().then(
      () => {
        localStorage.setItem('sectionId', id);
        if (this.model.timeLimit > 0) this.timer.start(this.model.timeLimit, this.model.bonusTime, this.updateSection.bind(this, this.model));
        this.setLoading(false);
      }
    );
  }

  @action updateSection(section) {
    localStorage.setItem('currentTime', null);
    this.setLoading(true);
    this.timer.cleanUp();
    section.save().then(
      ({ data }) => {
        isUndefined(data) ? router.navigate('finish') : this.edit(data.uuid);
      }
    );
  }

}

export default new SectionsStore();
