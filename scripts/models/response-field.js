import { action, computed } from "mobx";

import Field           from "./field";
import ResponseOptions from "./../collections/response-options";

class ResponseField extends Field {

  static get associations() {
    return {
      options: { collection: ResponseOptions, parentKey: 'test' }
    };
  }

  @computed get availableOptions() {
    return this.options;
  }

  @action setValue(val) {
    this.set('userContent', val);
  }

  @computed get value() {
    return this.get('userContent') || "";
  }

  @action _selectSingleSelectedOption(option) {
    this.options.each(o => o.set('userSelected', false));
    option.set('userSelected', true);
  }

  @action _selectMultipeSelectedOption(option) {
    option.set('userSelected', !option.userSelected);
  }

}
export default ResponseField;
