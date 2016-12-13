import React from "react";
import { action, computed } from "mobx";
import { Modifier, Entity, EditorState, convertToRaw, CompositeDecorator } from "draft-js";
import Editor from "./editor";

import ui from "./../stores/ui";

class ReviewEditor extends Editor {

  initialize() {
    this.mistakeTypes = this._getMistakeTypes();
    this.decorators   = this._getDecorators();
    this.decorateState();
    window.editor = this;
  }

  get showMistakeControls() {
    return true;
  }

  @computed get mistakesCount() {
    const count = {};
    const { entityMap } = this.rawContent;

    Object.keys(entityMap).forEach(key => {
      const mt = this.mistakeTypes.find({ identifier: entityMap[key].data.identifier });
      if (!mt) return;
      count[mt.identifier] = count[mt.identifier] || { name: mt.name, penalty: 0, count: 0 };
      count[mt.identifier].penalty += mt.penalty;
      count[mt.identifier].count += 1;
    });

    return count;
  }

  @computed get totalPenalty() {
    return Object.keys(this.mistakesCount).reduce(
      (total, identifier) => total + this.mistakesCount[identifier].penalty, 0
    );
  }

  @action decorateState() {
    this.state = EditorState.set(this.state, { decorator: this.decorators });
  }

  @action markMistake(identifier) {
    const entityKey = Entity.create(
      'MISTAKE',
      'MUTABLE',
      { identifier: identifier }
    );

    const nextContent = Modifier.applyEntity(
      this.state.getCurrentContent(),
      this.state.getSelection(),
      entityKey
    );

    this.state = EditorState.createWithContent(nextContent);
    this.decorateState();
  }

  @action handleBeforeInput(chars) {
    return 'handled';
  }

  @action handleKeyCommand(command) {
    return 'handled';
  }

  @action handleReturn() {
    return 'handled';
  }

  @computed get rawContent() {
    return convertToRaw(this.state.getCurrentContent());
  }

  _getDecorators() {
    const decorators = this.mistakeTypes.map(type => {
      return {
        strategy: (block, callback) => {
          block.findEntityRanges(
            (meta) => meta.getEntity() && Entity.get(meta.getEntity()).data.identifier === type.identifier,
            callback
          );
        },
        component: (props) => <span style={{ backgroundColor: type.color, color: 'white' }}>{props.children}</span>
      }
    });
    return new CompositeDecorator(decorators);
  }

  _getMistakeTypes() {
    return ui.getData('mistakeTypes')
  }

}

export default ReviewEditor;
