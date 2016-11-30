import AppCollection from "./app-collection";

import ResponseField from "./../models/response-field";

class ResponseFields extends AppCollection {

  static get model() {
    return ResponseField;
  }

}

export default ResponseFields;
