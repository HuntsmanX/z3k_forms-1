import {
  observable,
  extendObservable,
  action,
  asMap,
  computed,
  toJS,
  autorun
} from "mobx";

import defaults      from "lodash/defaults";
import isFunction    from "lodash/isFunction";
import isPlainObject from "lodash/isPlainObject";
import omit          from "lodash/omit";
import includes      from "lodash/includes";
import flatten       from "lodash/flatten";
import camelize      from "underscore.string/camelize";
import decapitalize  from "underscore.string/decapitalize";
import uuid          from "node-uuid";

import ajax from "./../helpers/ajax";

class AppModel {

  // All model attributes are kept in the 'attrs' map. This is more
  // convenient than keeping all attributes directly on the model object
  // as this allows easier serialization to JSON.

  @observable attrs = asMap({});

  // Errors are written into 'errors' map upon unsuccessful creation
  // or update i.e. when server responds with 422 status. See 'setErrors',
  // 'unsetErrors' and 'save' methods.

  @observable errors = asMap({});

  // 'uuid' is a unique string identifer, may be used as the 'key' prop
  // in React views when iterating over a collection of objects or
  // for identifying an object in a collection when 'id' is not yet set

  uuid = uuid.v4();

  // Do not override constructor in child classes, use 'initialize' method
  // instead.

  constructor(data = {}) {
    this.setDefaultAttributes();
    this.fromJSON(data);
    this.initialize();
  }

  // To be overridden by child classes to perform initialization.

  @action initialize() {}

  // Default attributes are assigned to the constructor function of the
  // class in the 'attributes' hash.

  get defaultAttributes() {
    return this.constructor.defaults || {};
  }

  // Assigned to the constructor function of the class. This is then used
  // during initialization to assign relations to the object.

  get associations() {
    return this.constructor.associations || {};
  }

  @computed get isPersisted() {
    return !!this.get('id');
  }

  @computed get isNew() {
    return !this.get('id');
  }

  @computed get isMarkedForDestruction() {
    return this.has('_destroy') && this.get('_destroy') === true;
  }

  @action markForDestruction() {
    this.set('_destroy', true);
  }

  // 'fromJSON' is called by the constructor and 'create'/'save'
  // methods in case of success.

  @action fromJSON(data = {}) {
    this.setAttributes(data);
    this.setAssociations(data);
  }

  @action setAttributes(data = {}) {
    const attrs = omit(data, Object.keys(this.associations));

    Object.keys(attrs).forEach(attrName => {
      this.set(attrName, attrs[attrName]);
    });
  }

  @action setDefaultAttributes() {
    const attrs = Object.assign({}, this.defaultAttributes, {
      isBeingFetched:   false,
      isBeingSaved:     false,
      isBeingDestroyed: false
    });
    this.setAttributes(attrs);
  }

  @action setAssociations(data = {}) {
    Object.keys(this.associations).forEach(associationName => {
      const associationConfig = this.associations[associationName];

      if (includes(Object.keys(associationConfig), 'collection'))
        this.setCollectionAssociation(associationName, data[associationName], associationConfig);
    });
  }

  @action setCollectionAssociation(name, data = [], config) {
    if (!data.length && name in this) return;

    const collection = new config.collection(
      data, { name: config.parentKey, model: this }
    );
    extendObservable(this, { [name]: collection });
  }

  // Options examples:
  //
  // serialize({ include: 'foo' });
  // serialize({ include: ['foo', 'bar'] });
  // serialize({ include: { foo: 'bar' } });
  // serialize({ include: { foo: ['bar', 'baz'] } });
  // serialize({ include: { foo: { bar: 'baz' } } });
  // serialize({ include: { foo: { bar: ['baz', 'qux'] } } });

  serialize(options = {}) {
    const data = toJS(this.attrs);
    if (options.include) this._serializeAssociations(data, options);
    return data;
  }

  _serializeAssociations(data, options) {
    const { include, includeMap } = options;

    const associations = isPlainObject(include) ?
      Object.keys(include) :
      flatten([include]);

    associations.forEach(association => {
      const childOptions = isPlainObject(include) ?
        { ...options, include: include[association] } :
        {};
      const key = includeMap && includeMap[association] ?
        includeMap[association] :
        association;

      data[key] = this[association].serialize(childOptions);
    });
  }

  @action set(attr, val) {
    this.attrs.set(attr, val);
    this._ensureAccessorsExist(attr);
  }

  get(attr) {
    return computed(
      () => this.attrs.get(attr)
    ).get();
  }

  has(attr) {
    return computed(
      () => this.attrs.has(attr)
    ).get();
  }

  @action setErrors(errors) {
    this.errors.merge(errors);
  }

  @action unsetErrors() {
    this.errors.clear();
  }

  @action clear() {
    this.attrs.clear();
    this.errors.clear();
    Object.keys(this.associations).forEach(associationName => {
      this[associationName].clear();
    });
  }

  error(attr) {
    return computed(
      () => this.errors.get(attr)
    ).get();
  }

  getUrlAndMethod(name) {
    const root = this.constructor.urlRoot;

    switch(name) {
      case 'fetch':   return [`${root}/${this.get('uid') || this.get('id')}`, "GET"];
      case 'create':  return [root,                                           "POST"];
      case 'update':  return [`${root}/${this.get('id')}`,                    "PATCH"];
      case 'destroy': return [`${root}/${this.get('id')}`,                    "DELETE"];
    }
  }

  @action fetch() {
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

  @action save() {
    const action = this.isPersisted ? 'update' : 'create';
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

  @action destroy() {
    const [ url, method ] = this.getUrlAndMethod('destroy');

    this.set('isBeingDestroyed', true);

    const request = ajax({
      url:    url,
      method: method
    });

    return request;
  }

  // Created attribute accessors for the given key unless attribute accessors
  // already exist. This allows shorter syntax for accessing attributes:
  //
  // obj.name instead of obj.get('name')
  // obj.name = 'foo' instead of obj.set('name', 'foo')
  //
  // TODO replace this with proxies if possible

  _ensureAccessorsExist(key) {
    if (key in this) return;

    Object.defineProperty(this, key, {
      get()    { return this.attrs.get(key) },
      set(val) { this.set(key, val); }
    });
  }

}

export default AppModel;
