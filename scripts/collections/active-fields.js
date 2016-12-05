import AppCollection from "./app-collection";

import ActiveField from "./../models/active-field";

class ActiveFields extends AppCollection {

  static get model() {
    return ActiveField;
  }

}

export default ActiveFields;
