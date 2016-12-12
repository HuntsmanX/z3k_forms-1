import React from "react";
import { action, computed } from "mobx";
import { Modifier, Entity, EditorState, convertToRaw, CompositeDecorator } from "draft-js";
import Editor from "./editor";

import ui from "./../stores/ui";

class ReviewEditor extends Editor {

  initialize() {
    this.decorators = this._getDecorators();
    this.decorateState();
  }

  get showMistakeControls() {
    return true;
  }

  mistakesCount(identifier) {
    let count = 0;

    const { entityMap } = this.rawContent;

    Object.keys(entityMap).forEach(key => {
      if (entityMap[key].data.identifier === identifier) count++;
    });

    return count;
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
    const decorators = ui.getData('mistakeTypes').map(type => {
      return {
        strategy: (block, callback) => {
          block.findEntityRanges(
            (meta) => Entity.get(meta.getEntity()).data.identifier === type.identifier,
            callback
          );
        },
        component: (props) => <span style={{ backgroundColor: type.color }}>{props.children}</span>
      }
    });
    return new CompositeDecorator(decorators);
  }

}

export default ReviewEditor;
