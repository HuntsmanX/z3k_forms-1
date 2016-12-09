import { observable, action } from "mobx";

import PubSub from "pubsub-js";

import MistakeTypes from "./../collections/mistake-types";

class UIStore {

  @observable data = {
    mistakeTypes: new MistakeTypes()
  };

  @observable isInitializing = true;
  @observable pageTitle      = '';

  constructor() {
    this.awaitValidation().then(
      () => this.fetchData(),
      () => this.postponeInit()
    ).then(
      () => this.completeInit()
    );
  }

  @action fetchData() {
    return Promise.all([
      this.data.mistakeTypes.fetch()
    ])
  }

  @action completeInit() {
    this.setInitializing(false);
  }

  @action postponeInit() {
    this.setInitializing(false);

    const listener = PubSub.subscribe('auth.validation.success', () => {
      PubSub.unsubscribe(listener);
      this.setInitializing(true);
      this.fetchData().then(
        () => this.setInitializing(false)
      );
    });
  }

  @action setInitializing(val) {
    this.isInitializing = val;
  }

  @action setPageTitle(title = '') {
    this.pageTitle = title;
    document.title = title.length ? `${title} | Z3K Forms` : "Z3K Forms";
  }

  getData(entity) {
    return this.data[entity];
  }

  awaitValidation() {
    return new Promise(
      (resolve, reject) => {
        const listener = PubSub.subscribe('auth.validation', (event) => {
          PubSub.unsubscribe(listener);
          event === 'auth.validation.success' ? resolve() : reject();
        });
      }
    );
  }

}

export default new UIStore();
