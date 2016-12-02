import AppCollection from "./app-collection";

import MistakeType from "./../models/mistake-type";

class MistakeTypesCollection extends AppCollection {

  static get model() {
    return MistakeType;
  }

  static get urlRoot() {
    return "/config/mistake_types";
  }

}

export default MistakeTypesCollection;
