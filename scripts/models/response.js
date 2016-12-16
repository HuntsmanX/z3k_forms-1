import { computed, action, autorun } from "mobx";

import AppModel from "./app-model";

import ResponseSections from "./../collections/response-sections";

class Response extends AppModel {

  static get urlRoot() {
    return "/v1/forms/responses";
  }

  static get defaults() {
    return {
      testId: ""
    };
  }

  static get associations() {
    return {
      sections: { collection: ResponseSections, parentKey: 'response' }
    };
  }

}

export default Response;
