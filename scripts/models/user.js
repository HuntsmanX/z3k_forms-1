import { action, computed } from "mobx";
import PubSub from "pubsub-js";

import AppModel from "./app-model";

import auth from "./../helpers/auth";

class User extends AppModel {

  initialize() {
    PubSub.subscribe('auth.validation.success', (e, data) => this.fromAuth(data));
    PubSub.subscribe('auth.signOut.success',    (e, data) => this.clearAttrs());
  }

  @computed get isSignedIn() {
    return this.isPersisted;
  }

  @action signIn() {
    this.set('isBeingSaved', true);

    const request = auth.emailSignIn({
      email:    this.email,
      password: this.password
    });

    request.then(
      () => this.set('isBeingSaved', false)
    );

    return request;
  }

  @action signOut() {
    if (!this.isSignedIn) return Promise.resolve();
    return auth.signOut();
  }

  @action fromAuth(data) {
    this.set('avatarUrl', data.avatar_url)
    this.set('id', data.id);
  }

  @action clearAttrs() {
    this.attrs.clear();
  }

}

export default User;
