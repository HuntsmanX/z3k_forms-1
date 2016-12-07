import { observable, action } from "mobx";

import MistakeTypes from "./../collections/mistake-types";

class UIStore {

  @observable data = {
    mistakeTypes: new MistakeTypes()
  };

  @observable pageTitle = '';

  constructor() {
    this.data.mistakeTypes.fetch();
  }

  @action setPageTitle(title = '') {
    this.pageTitle = title;

    document.title = title.length ? `${title} | Z3K Forms` : "Z3K Forms";
  }

  getData(entity) {
    return this.data[entity];
  }

}

export default new UIStore();
