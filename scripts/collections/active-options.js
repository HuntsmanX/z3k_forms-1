import AppCollection from "./app-collection";

import ActiveOption from "./../models/active-option";

class ActiveOptions extends AppCollection {

  static get model() {
    return ActiveOption;
  }

}

export default ActiveOptions;
