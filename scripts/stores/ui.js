import { observable, action } from "mobx";

class UIStore {

  @observable pageTitle = '';

  @action setPageTitle(title = '') {
    this.pageTitle = title;

    document.title = title.length ? `${title} | Z3K Forms` : "Z3K Forms";
  }

}

export default new UIStore();
