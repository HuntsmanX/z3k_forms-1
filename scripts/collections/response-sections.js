import AppCollection from "./app-collection";

import ResponseSection from "./../models/response-section";

class ResponseSectionsCollection extends AppCollection {

  static get model() {
    return ResponseSection;
  }

  static get urlRoot() {
    return "/response/sections";
  }

}

export default ResponseSectionsCollection;
