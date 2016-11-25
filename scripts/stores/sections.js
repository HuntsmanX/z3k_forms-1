import { observable, action } from "mobx";
import isUndefined from "lodash/isUndefined";

import ui from     "./ui";
import router from "./router";

import ResponseSection   from "./../models/response-section";

class SectionsStore {

  @observable loading = false;
  @observable model = new ResponseSection();

  @action setLoading(val){
    this.loading = val;
  }

  @action edit(id) {
    this.model.set('id', id);
    this.setLoading(true)
    this.model.fetch().then(
      () => this.setLoading(false)
    );
  }

  @action updateSection(section) {
    this.setLoading(true);
    section.save().then(
      ({ data }) => {
        if (isUndefined(data)) {
          router.navigate('finish');
        } else {
          this.edit(data.uuid);
        }
      })
  }

}
export default new SectionsStore();
