import AppModel from "./app-model";
import { action } from "mobx";
import { Entity } from "draft-js";

class MistakeType extends AppModel {

  static get urlRoot() {
    return "/config/mistake_types";
  }

  static get defaults() {
    return {
      color:   "",
      name:    "",
      penalty: 1,
      colors: ['#E8E3E3', '#FFCCCC', '#E6A119', '#EBEB47', '#47EBEB', '#A3BEF5', '#F5A3F5', '#FFEB3B']
    };
  }

  get identifier() {
    return `mistake-${this.id}`;
  }

  @action handleChange(model, color, event) {
    model.set('color', color.hex);
  }

}

export default MistakeType;
