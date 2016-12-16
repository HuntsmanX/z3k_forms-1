import AppCollection from "./app-collection";

import Response from "./../models/response";

class ResponsesCollection extends AppCollection {

  static get model() {
    return Response;
  }

  static get urlRoot() {
    return "/v1/forms/responses";
  }

}

export default ResponsesCollection;
