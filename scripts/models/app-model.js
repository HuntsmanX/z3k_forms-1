import {
  observable,
  extendObservable,
  action,
  asMap,
  computed
} from "mobx";

import defaults     from "lodash/defaults";
import isFunction   from "lodash/isFunction";
import omit         from "lodash/omit";
import camelize     from "underscore.string/camelize";
import decapitalize from "underscore.string/decapitalize";
import uuid         from "node-uuid";

import ajax from "./../helpers/ajax";

class AppModel {

  @observable isBeingFetched   = false;
  @observable isBeingSaved     = false;
  @observable isBeingDestroyed = false;

  @observable errors = asMap({});

  uuid = uuid.v4();

  constructor(data = {}) {
    this.fromJSON(data);
  }

  get attributeNames() {
    return Object.keys(this.defaultAttributes || {});
  }

  get associations() {
    return this.constructor.associations || {};
  }

  get defaultAttributes() {
    return this.constructor.attributes || {};
  }

  get className() {
    return this.constructor.name;
  }

  @computed get isPersisted() {
    return !!this.id;
  }

  @action fromJSON = (data = {}) => {
    defaults(data, this.defaultAttributes);

    this.initAttributes(data);
    this.initAssociations(data);
  }

  @action initAttributes = (data = {}) => {
    const attrs = omit(data, Object.keys(this.associations));
    extendObservable(this, attrs);
  }

  @action initAssociations = (data = {}) => {
    Object.keys(this.associations).forEach(association => {
      const funcName = camelize(`init ${this.associations[association].type} association`);
      this[funcName](association, data[association], this.associations[association].klass);
    });
  }

  @action initHasManyAssociation = (association, data = [], klass) => {
    const collection = new klass(
      data, { name: decapitalize(this.constructor.name), model: this }
    );
    extendObservable(this, { [association]: collection });
  }

  @action set = (attr, val) => {
    this[attr] = val;
  }

  @action setErrors = (errors) => {
    Object.keys(errors).forEach(attr => this.errors.set(attr, errors[attr]));
  }

  @action unsetErrors = () => {
    this.errors.clear();
  }

  getUrlAndMethod = (name) => {
    const url = this.constructor.urls[name];

    if (!url) console.warn(`${name} URL is not specified for ${this.className} class`)
    if (isFunction(url)) return url.call(this);

    return url;
  }

  serialize = () => {
    const attrs = {};
    this.attributeNames.map(attr => attrs[attr] = this[attr]);
    return { test: attrs };
  }

  @action fetch = () => {
    const [ url, method ] = this.getUrlAndMethod('fetch');

    this.set('isBeingFetched', true);

    const request = ajax({
      url:    url,
      method: method
    });

    request.then(
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

  @action save = () => {
    const action = this.id ? 'update' : 'create';
    const [ url, method ] = this.getUrlAndMethod(action);

    this.unsetErrors();
    this.set('isBeingSaved', true);

    const request = ajax({
      url:     url,
      method:  method,
      payload: this.serialize()
    });

    request.then(
      ({ data }) => {
        this.fromJSON(data);
        this.set('isBeingSaved', false);
      },
      (xhr) => {
        this.set('isBeingSaved', false);
        if (xhr.status === 422) this.setErrors(xhr.responseJSON);
      }
    );

    return request;
  }

  @action destroy = () => {
    const [ url, method ] = this.getUrlAndMethod('destroy');

    this.set('isBeingDestroyed', true);

    const request = ajax({
      url:    url,
      method: method
    });

    return request;
  }

}

export default AppModel;
