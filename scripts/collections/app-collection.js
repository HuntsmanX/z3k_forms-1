import {
  observable,
  asMap,
  action,
  extendObservable,
  computed
} from "mobx";

import isFunction  from "lodash/isFunction";
import _array      from "lodash/array";
import _collection from "lodash/collection";
import camelize    from "underscore.string/camelize";
import defaults    from "lodash/defaults";
import debounce    from "lodash/debounce";

import ajax from "./../helpers/ajax";

class AppCollection {

  @observable models         = [];
  @observable isBeingFetched = false;
  @observable currentPage    = 1;
  @observable totalPages     = 0;
  @observable totalItems     = 0;
  @observable perPage        = 25;
  @observable query          = asMap({});

  constructor(data = [], parent = {}) {
    this.parent = parent;
    this.mixinLodashFunctions();
    this.fromJSON(data);
    this.initialize();
    this.persistOrder = debounce(this.persistOrder, 1000);
  }

  // To be overridden by child classes to perform initialization.

  @action initialize() {}

  // Mixes in lodash array and collection functions into the collection.
  // See https://lodash.com/docs for available methods

  mixinLodashFunctions() {
    const functions = Object.assign({}, _array, _collection);

    const skip = ['remove'];

    Object.keys(functions).forEach(func => {
      if (!functions.includes(skip, func)) {
        this[func] = (...args) => functions[func](this.models, ...args)
      }
    });
  }

  @action fromJSON(data = []) {
    let models = data.map(obj => {
      let model = new this.modelClass(obj);
      this.assignParent(model);
      return model;
    });

    models = _collection.sortBy(models, model => model.orderIndex || 0);

    this.set('models', models);
  }

  serialize(options = {}) {
    return this.models.map(model => model.serialize(options));
  }

  // Collection is consireded ordered if all models have 'orderIndex'
  // attribute. If that is the case, 'orderIdex' is updated by 'add',
  // 'move' and 'remove' methods.

  @computed get isOrdered() {
    return this.every(model => model.has('orderIndex'));
  }

  @computed get length() {
    return this.models.length;
  }

  @computed get notMarkedForDestruction() {
    return this.filter(model => !model.isMarkedForDestruction);
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
      case 'fetch':   return root;
      case 'reorder': return `${root}/reorder`;
    }
  }

  @action set(attr, val) {
    this[attr] = val;
  }

  @action setQuery(attr, val) {
    this.query.set(attr, val);
  }

  @action fetch() {
    this.set('isBeingFetched', true);

    const request = ajax({
      url:     this.getUrl('fetch'),
      payload: {
        q:    this.query.toJSON(),
        page: this.currentPage,
        per:  this.perPage
      }
    });

    request.then(
      ({ data, meta }) => {
        this.fromJSON(data);
        this._setPagination(meta);
        this.set('isBeingFetched', false);
      },
      () => {
        this.set('isBeingFetched', false);
      }
    );

    return request;
  }

  @action persistOrder() {
    const order = {};

    this.notMarkedForDestruction.forEach(
      model => order[model.id] = model.orderIndex
    );

    ajax({
      url:     this.getUrl('reorder'),
      method:  'PUT',
      payload: { order: order }
    });
  }

  // Assigns parent models to all models in the collection - kinda
  // creates 'belongs to' association.

  @action assignParent(model) {
    const { name: parentName, model: parentModel } = this.parent;
    if (!parentModel || !parentName) return;
    extendObservable(model, { [parentName]: parentModel });
    model.set(`${parentName}Id`, parentModel.id);
  }

  @action add(attrs = {}) {
    _array.flatten([attrs]).forEach(attr => {
      let model = new this.modelClass(attr || {});
      this.assignParent(model);
      this.models.push(model);
    });
    this._setOrderIndexes();
  }

  @action remove(uuid, options = {}) {
    const index = this.findIndex({ uuid: uuid });
    this.models.splice(index, 1);
    this._setOrderIndexes(options);
  }

  @action markForDestruction(uuid) {
    const model = this.find({ uuid: uuid });
    model.markForDestruction();
    this._setOrderIndexes();
  }

  @action move(fromId, toId, options = {}) {
    const fromIndex = this.findIndex({ uuid: fromId });
    const toIndex   = this.findIndex({ uuid: toId });

    this.models.splice(
      toIndex, 0, this.models.splice(fromIndex, 1)[0]
    );
    this._setOrderIndexes(options);
  }

  @action _setOrderIndexes(options = {}) {
    if (!this.isOrdered) return;

    this.notMarkedForDestruction.forEach(
      (model, index) => model.set('orderIndex', index)
    );

    if (options.persistOrder) this.persistOrder();
  }

  @action _setPagination(data = {}) {
    const { totalPages, totalItems, currentPage } = data;

    if (!totalPages || !totalItems || !currentPage) return;

    this.set('totalPages',  totalPages);
    this.set('totalItems',  totalItems);
    this.set('currentPage', currentPage);
  }

}

export default AppCollection;
