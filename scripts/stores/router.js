import { RouterStore as Router, startRouter } from "mobx-router";
import { action, toJS } from "mobx";

import views from "./../views";

class RouterStore extends Router {

  @action start = (stores) => {
    this.stores = stores;
    this.views  = views;

    startRouter(this.views, this.stores);
  }

  @action navigate = (to, params = {}) => {
    this.goTo(this.views[to], params, this.stores);
  }

  @action replaceUrlParamsForView = (view, params) => {
    return this.views[view].replaceUrlParams(params);
  }

  @action goTo = (view, paramsObj, store) => {
    const currentParams = toJS(this.params);

    const beforeExitResult = this.currentView && this.currentView.beforeExit ?
      this.currentView.beforeExit({ route: this.currentView, params: currentParams, s: store }) :
      true;

    if (beforeExitResult === false) return;

    const beforeEnterResult = view.beforeEnter ?
      view.beforeEnter({ route: view,  params: currentParams, s: store }) :
      true;

    if (beforeEnterResult === false) return;

    this.currentView && this.currentView.onExit &&
      this.currentView.onExit({ route: this.currentView, params: currentParams, s: store });

    this.currentView = view;
    this.params      = toJS(paramsObj);
    const nextParams = toJS(paramsObj);

    view.onEnter && view.onEnter({ route: this.currentView, params: nextParams, s: store });
  }

}

export default new RouterStore();
