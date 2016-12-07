import React from "react";
import { action, computed } from "mobx";
import { Modifier, Entity, EditorState, convertToRaw, CompositeDecorator } from "draft-js";
import Editor from "./editor";

import ui from "./../stores/ui";

class ReviewEditor extends Editor {

  get showMistakeControls() {
    return true;
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

  mistakesCount(identifier) {
    let count = 0;

    const { entityMap } = convertToRaw(this.state.getCurrentContent());

    Object.keys(entityMap).forEach(key => {
      if (entityMap[key].data.identifier === identifier) count++;
    });

    return count;
  }

}

export default ReviewEditor;
