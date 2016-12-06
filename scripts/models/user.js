import { observable, computed, action, asMap} from "mobx";
import AppModel from "./app-model";

class User extends AppModel {

  static get defaults() {
    return {
      email:  '',
      password: ''
    };
  }

}
export default User;
