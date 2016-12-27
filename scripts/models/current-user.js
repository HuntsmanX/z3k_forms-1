import { action, computed, observable } from "mobx";
import PubSub from "pubsub-js";

import AppModel from "./app-model";
import Ability  from "./ability";

import auth from "./../helpers/auth";

class CurrentUser extends AppModel {

  @observable ability = new Ability(this);

  initialize() {
    PubSub.subscribe('auth.validation.success', (e, data) => this.fromAuth(data));
    PubSub.subscribe('auth.signOut.success',    (e, data) => this.clearAttrs());
  }

  @computed get isSignedIn() {
    return this.isPersisted;
  }

  @action signIn() {
    this.set('isBeingSaved', true);
    this.unsetErrors();

    const request = auth.emailSignIn({
      email:    this.email,
      password: this.password
    });

    request.then(
      () => {
        this.set('isBeingSaved', false);
      },
      ({ reason }) => {
        this.set('isBeingSaved', false);
        this.setErrors({ email: [reason], password: [reason] });
      }
    );

    return request;
  }

  @action signOut() {
    if (!this.isSignedIn) return Promise.resolve();
    return auth.signOut();
  }

  @action fromAuth(data) {
    this.set('id', data.id);
    this.set('avatarUrl', STAFF_API_URL + data.avatar_url);
    this.ability.setPermissions(data.permissions);
  }

  @action clearAttrs() {
    this.attrs.clear();
    this.ability.unsetPermissions();
  }

}

export default CurrentUser;
