import { computed, action } from "mobx";

import AppModel from "./app-model";

class Response extends AppModel {

  static get defaults() {
    return {
      testId: ""
    };
  }

}

Response.urlRoot = "/responses";

export default Response;
