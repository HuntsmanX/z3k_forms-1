import AppCollection from "./app-collection";

import Response from "./../models/response";

class ResponsesCollection extends AppCollection {}

ResponsesCollection.model = Response;

ResponsesCollection.urlRoot = "/responses";

export default ResponsesCollection;
