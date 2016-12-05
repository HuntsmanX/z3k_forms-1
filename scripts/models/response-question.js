import { observable, action, computed } from "mobx";
import { sumBy } from "lodash";
import humanize from "underscore.string/humanize";

import AppModel       from "./app-model";
import ResponseFields from "./../collections/response-fields";
import QuestionEditor from "./question-editor";

import { scoreRainbow } from "./../helpers/rainbow";

class ResponseQuestion extends AppModel {

  static get urlRoot() {
    return "/response/questions";
  }

  static get associations() {
    return {
      fields: { collection: ResponseFields, parentKey: 'question' }
    };
  }

  static get defaults() {
    return {
      isBeingEdited: false
    };
  }

  @observable editor = null;

  @action fromJSON(data) {
    super.fromJSON(data);
    this.editor = new QuestionEditor(this.content)
  }

  @computed get isChecked() {
    return this.fields.every('checked')
  }

  @computed get readOnly() {
    return true;
  }

  @computed get availableFields() {
    return this.fields;
  }

  @computed get maxScore() {
    return sumBy(this.fields.models, 'score');
  }

  @computed get userScore() {
    return sumBy(this.fields.models, 'userScore');
  }

  @computed get scoreColor() {
    if (!this.isChecked) return 'white';

    const percent = Math.round((this.userScore || 0) * 100 / this.maxScore);
    return `#${scoreRainbow.colorAt(percent)}`;
  }

  @action edit() {
    this.fields.each(f => f.set('checked', true));
    this.set('isBeingEdited', true);
  }

  @action save() {
    super.save().then(
      () => this.set('isBeingEdited', false)
    );
  }

  serialize() {
    const data = super.serialize({
      include:    { fields: 'options' },
      includeMap: { fields: 'fieldsAttributes', options: 'optionsAttributes' }
    });
    data.content = this.editor.serialize();
    return data;
  }

}

export default ResponseQuestion;
