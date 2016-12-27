import { observable, action, extendObservable } from "mobx";

import chunk from "lodash/chunk";
import some  from "lodash/some";

import ui     from "./ui";
import router from "./router";

import CurrentUser from "./../models/current-user";

class SessionStore {

  @observable signInFormShown = false;

  constructor() {
    extendObservable(this, {
      currentUser: new CurrentUser()
    });

    this.ifAllowed = this.ifAllowed.bind(this);
  }

  @action newSession() {
    ui.setPageTitle("Sign In");
  }

  @action create() {
    this.currentUser.signIn().then(
      () => router.redirectAfterSignIn()
    );
  }

  @action destroy(navigate = true) {
    this.currentUser.signOut().then(
      () => navigate && router.navigate('signIn')
    );
  }

  ifAllowed(...args) {
    const ret = args.pop();
    const pairs = chunk(args, 2);

    const allowed = some(
      pairs.map(p => this.currentUser.ability.allowed(p[0], p[1]))
    );

    return allowed ? ret : null;
  }

}

export default new SessionStore();
