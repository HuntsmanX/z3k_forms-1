import { observable, action } from "mobx";

import ui     from "./ui";
import router from "./router";
import User   from "./../models/user"
import ajax   from "./../helpers/ajax";

class SessionStore {

  @observable currentUser     = new User();
  @observable signInFormShown = false;

  @action signInForm(val) {
    this.currentUser = new User();
    this.signInFormShown = val;
  }

  @action create() {
    return ajax({ prefix: false, url: '/auth/sign_in', method: 'POST', payload: { user: this.currentUser.serialize() } }).then(
      ({ data }) => {
        this.currentUser.email = data.email
        this.currentUser.firstNameEng = data.firstNameEng
        this.currentUser.lastNameEng  = data.lastNameEng
        this.signInForm(false);
      }
    );
  }

}
export default new SessionStore();
