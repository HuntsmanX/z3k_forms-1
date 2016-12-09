import { observable, action, extendObservable } from "mobx";

import ui     from "./ui";
import router from "./router";
import User   from "./../models/user"

class SessionStore {

  @observable signInFormShown = false;

  constructor() {
    extendObservable(this, {
      user: new User()
    });
  }

  @action newSession() {
    ui.setPageTitle("Sign In");
  }

  @action create() {
    this.user.signIn().then(
      () => router.redirectAfterSignIn()
    );
  }

  @action destroy(navigate = true) {
    this.user.signOut().then(
      () => navigate && router.navigate('signIn')
    );
  }

}

export default new SessionStore();
