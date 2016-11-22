import { action } from "mobx";
import { EditorState, Entity, AtomicBlockUtils, Modifier } from "draft-js";
import includes from "lodash/includes";

import Editor from "./editor";

class QuestionEditor extends Editor {

  static get defaultText() {
    return "Untitled question";
  }

  initialize(content, onChange) {
    this._onChange = onChange;
  }

  @action set(value) {
    const backspace = value.getLastChangeType() === 'backspace-character';
    this.state = backspace ? this._handleDelete(value) : value;
    this._onChange();
  }

  @action handleKeyCommand(command) {
    if (command === "backspace") return false;
    return super.handleKeyCommand(command);
  }

  @action handleReturn(event) {
    const blockKey  = this.state.getSelection().getFocusKey();
    const blockType = this.state.getCurrentContent().getBlockForKey(blockKey).getType();

    if (includes(['code-block', 'unordered-list-item', 'ordered-list-item'], blockType)) {
      return 'not-handled';
    } else {
      this.insertEolBlock();
      return 'handled';
    }
  }

  @action insertEolBlock() {
    const entityKey = Entity.create('eol-block', 'IMMUTABLE');

    this.set(
      AtomicBlockUtils.insertAtomicBlock(this.state, entityKey, ' ')
    );
  }

  @action insertField(type) {
    const entityKey = Entity.create(type, 'IMMUTABLE');
    const newState  = AtomicBlockUtils.insertAtomicBlock(this.state, entityKey, ' ');

    this.set(newState);

    const activeBlockKey = newState.getSelection().getFocusKey();
    const fieldBlockKey  = newState.getCurrentContent().getKeyBefore(activeBlockKey);

    return fieldBlockKey;
  }

  isBlockPresent(blockKey) {
    return !!this.state.getCurrentContent().getBlockForKey(blockKey);
  }

  _handleDelete(value) {
    const blockKey = value.getSelection().getFocusKey();
    const block    = value.getCurrentContent().getBlockForKey(blockKey);

    if (block.getType() !== "atomic") return value;

    const previousBlockKey = value.getCurrentContent().getKeyBefore(blockKey);
    const previousBlock    = value.getCurrentContent().getBlockForKey(previousBlockKey);

    let selection = value.getSelection();
    selection     = selection.set('anchorKey', previousBlockKey);
    selection     = selection.set('anchorOffset', previousBlock.getLength());

    const modifiedContent = Modifier.removeRange(value.getCurrentContent(), selection, 'backward');
    return EditorState.push(this.state, modifiedContent, value.getLastChangeType());
  }

}

export default QuestionEditor;
