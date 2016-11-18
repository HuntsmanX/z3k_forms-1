import { computed, action } from "mobx";

import AppModel from "./app-model";

class Response extends AppModel {

}

Response.urlRoot = "/responses";

export default Response;
