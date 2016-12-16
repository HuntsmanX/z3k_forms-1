import AppModel from "./app-model";
import { action } from "mobx";
import { Entity } from "draft-js";

class MistakeType extends AppModel {

  static get urlRoot() {
    return "/v1/forms/config/mistake_types";
  }

  static get defaults() {
    return {
      color:   "",
      name:    "",
      penalty: 1
    };
  }

  get identifier() {
    return `mistake-${this.id}`;
  }

}

export default MistakeType;
