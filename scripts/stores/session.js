import { observable, action } from "mobx";

import ui     from "./ui";
import router from "./router";
import User   from "./../models/user"
import ajax   from "./../helpers/ajax";
import auth   from "./../helpers/j-toker-config";

class SessionStore {

  @observable currentUser     = new User();
  @observable signInFormShown = false;

  @action signInForm(val) {
    this.currentUser = new User();
    this.signInFormShown = val;
  }

  @action create() {
    auth.emailSignIn({
      email:    this.currentUser.email,
      password: this.currentUser.password
    }).then(
      ({ data }) => {
        this.currentUser.email = data.email
        this.currentUser.firstNameEng = data.firstNameEng
        this.currentUser.lastNameEng  = data.lastNameEng
        this.signInForm(false);
        router.navigate('dashboard');
      }
    );
  }

}
export default new SessionStore();
