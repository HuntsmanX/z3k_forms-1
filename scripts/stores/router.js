import { RouterStore as Router, startRouter } from "mobx-router";
import { action, toJS, when } from "mobx";

import views from "./../views";

class RouterStore extends Router {

  @action start(stores) {
    this.stores = stores;
    this.views  = views;

    when(
      () => this.stores.ui.isInitializing === false,
      () => startRouter(this.views, this.stores)
    );
  }

  @action navigate(to, params = {}) {
    this.goTo(this.views[to], params);
  }

  @action checkAuth(options) {
    if (!this.stores.session.currentUser.isSignedIn) {
      this.beforeSignIn = options;
      this.navigate('signIn');
      return false;
    }
    return true;
  }

  @action redirectAfterSignIn() {
    this.beforeSignIn ?
      this.goTo(this.beforeSignIn.route, this.beforeSignIn.nextParams) :
      this.navigate('dashboard');
    this.beforeSignIn = null;
  }

  @action replaceUrlParamsForView(view, params) {
    return this.views[view].replaceUrlParams(params);
  }

  @action goTo(view, paramsObj, store = this.stores) {
    const currentParams = toJS(this.params);

    const beforeExitResult = this.currentView && this.currentView.beforeExit ?
      this.currentView.beforeExit({ route: this.currentView, params: currentParams, s: store }) :
      true;

    if (beforeExitResult === false) return;

    const beforeEnterResult = view.beforeEnter ?
      view.beforeEnter({ route: view, params: currentParams, nextParams: paramsObj, s: store }) :
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
