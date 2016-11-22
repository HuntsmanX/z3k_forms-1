import { action, observable } from "mobx";
import { EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from "draft-js";

class Editor {

  @observable state = null;

  constructor(content, ...args) {
    this.state = this._parseRawContent(content);
    this.initialize(content, ...args);
  }

  initialize(content, ...args) {}

  @action set(value) {
    this.state = value;
  }

  @action handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state, command);

    if (newState) {
      this.set(newState);
      return true;
    }
    return false;
  }

  @action toggleBlockType(blockType) {
    this.set(
      RichUtils.toggleBlockType(this.state, blockType)
    );
  }

  @action toggleInlineStyle(style) {
    this.set(
      RichUtils.toggleInlineStyle(this.state, style)
    );
  }

  serialize() {
    return JSON.stringify(
      convertToRaw(this.state.getCurrentContent())
    );
  }

  _parseRawContent(content) {
    try {
      return EditorState.moveSelectionToEnd(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        )
      );
    }
    catch(error) {
      return this._getDefaultState();
    }
  }

  _getDefaultState() {
    return EditorState.moveSelectionToEnd(
      EditorState.createWithContent(
        ContentState.createFromText(this.defaultText)
      )
    );
  }

  get defaultText() {
    return this.constructor.defaultText || "";
  }

}

export default Editor;
