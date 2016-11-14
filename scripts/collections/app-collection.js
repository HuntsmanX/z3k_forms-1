import {
  observable,
  action,
  extendObservable,
  computed
} from "mobx";

import isFunction  from "lodash/isFunction";
import _collection from "lodash/collection";

import ajax from "./../helpers/ajax";

class AppCollection {

  @observable models         = [];
  @observable isBeingFetched = false;

  constructor(data = [], parent = {}) {
    this.parent = parent;
    this.mixinLodashFunctions();
    this.fromJSON(data);
  }

  mixinLodashFunctions() {
    Object.keys(_collection).forEach(func => {
      this[func] = (...args) => _collection[func](this.models, ...args)
    })
  }

  fromJSON = (data = []) => {
    const models = data.map(obj => {
      let model = new this.modelClass(obj);
      this.assignParent(model);
      return model;
    });

    this.set('models', models)
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

  getUrl = (name) => {
    const url = this.constructor.urls[name];

    if (!url) console.warn(`${name} URL is not specified for ${this.className} class`)
    if (isFunction(url)) return url.call(this);

    return url;
  }

  @action set = (attr, val) => {
    this[attr] = val;
  }

  @action fetch = () => {
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

  @action assignParent = (model) => {
    if (this.parent.model && this.parent.name)
      extendObservable(model, { [parent.name]: parent.model });
  }

  @action add = (attrs = {}) => {
    let model = new this.modelClass(attrs);
    this.assignParent(model);
    this.models.push(model);
  }

}

export default AppCollection;
