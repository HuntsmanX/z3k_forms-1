import { observable, action } from "mobx";

class UIStore {

  @observable pageTitle    = '';

  @action setPageTitle = (title = '') => {
    this.pageTitle = title;
  }

}

export default new UIStore();
