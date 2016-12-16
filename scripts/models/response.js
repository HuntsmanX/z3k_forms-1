import { computed } from "mobx";

import AppModel from "./app-model";

import ResponseSections from "./../collections/response-sections";

class Response extends AppModel {

  static get urlRoot() {
    return "/responses";
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

  @computed get isSuccessful() {
    if (!this.checked) return "Pending";
    return this.successful ? "Yes" : "No";
  }

  @computed get isSuccessfulLabelClass() {
    if (!this.checked) return "secondary";
    return this.successful ? "success" : "alert";
  }

}

export default Response;
