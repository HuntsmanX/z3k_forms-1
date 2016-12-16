import AppCollection from "./app-collection";

import MistakeType from "./../models/mistake-type";

class MistakeTypesCollection extends AppCollection {

  static get model() {
    return MistakeType;
  }

  static get urlRoot() {
    return "/v1/forms/config/mistake_types";
  }

}

export default MistakeTypesCollection;
