import AppCollection from "./app-collection";

import ResponseOption from "./../models/response-option";

class ResponseOptions extends AppCollection {

  static get model() {
    return ResponseOption;
  }

}

export default ResponseOptions;
