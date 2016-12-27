import { computed } from "mobx";

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

  static get resourceKey() {
    return "forms:response";
  }

  @computed get isSuccessfulLabel() {
    if (!this.checked) return "Pending";
    return this.isSuccessful ? "Yes" : "No";
  }

  @computed get isSuccessfulLabelClass() {
    if (!this.checked) return "secondary";
    return this.isSuccessful ? "success" : "alert";
  }

}

export default Response;
