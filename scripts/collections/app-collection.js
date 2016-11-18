import {
  observable,
  action,
  extendObservable,
  computed
} from "mobx";

import isFunction  from "lodash/isFunction";
import _array      from "lodash/array";
import _collection from "lodash/collection";

import ajax from "./../helpers/ajax";

class AppCollection {

  @observable models         = [];
  @observable isBeingFetched = false;

  constructor(data = [], parent = {}) {
    this.parent = parent;
    this.mixinLodashFunctions();
    this.fromJSON(data);
    this.initialize();
  }

  // To be overridden by child classes to perform initialization.
  @action initialize() {}

  mixinLodashFunctions() {
    const functions = Object.assign({}, _array, _collection);
    Object.keys(functions).forEach(func => {
      this[func] = (...args) => _collection[func](this.models, ...args)
    });
  }

  fromJSON(data = []) {
    const models = data.map(obj => {
      let model = new this.modelClass(obj);
      this.assignParent(model);
      return model;
    });

    this.set('models', models)
  }

  serialize(options = {}) {
    return this.models.map(model => model.serialize(options));
  }

  @computed get length() {
    return this.models.length;
  }

  get modelClass() {
    return this.constructor.model;
  }

  get className() {
    return this.constructor.name;
  }

  getUrl(name) {
    const root = this.constructor.urlRoot;

    switch(name) {
      case 'fetch': return root;
    }
  }

  @action set(attr, val) {
    this[attr] = val;
  }

  @action fetch() {
    this.set('isBeingFetched', true);

    const request = ajax({
      url: this.getUrl('fetch')
    }).done(
      ({ data }) => {
        this.fromJSON(data);
        this.set('isBeingFetched', false);
      },
      () => {
        this.set('isBeingFetched', false);
      }
    );

    return request;
  }

  @action assignParent(model) {
    if (this.parent.model && this.parent.name)
      extendObservable(model, { [this.parent.name]: this.parent.model });
  }

  @action add(attrs = {}) {
    _array.flatten([attrs]).forEach(attr => {
      let model = new this.modelClass(attr || {});
      this.assignParent(model);
      this.models.push(model);
    });
  }

}

export default AppCollection;
