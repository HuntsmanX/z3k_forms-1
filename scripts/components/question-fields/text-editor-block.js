import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Editor } from "draft-js";

import Controls from "./text-editor-block/controls";

import styleMap from "./../../helpers/draft-style-map";

@inject("s")
@observer
class TextEditorBlock extends Component {

  renderBlocker = () => {
    return (
      <div
        className="blocker"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    );
  }

  render() {
    const { field, field: { editor }, onFocus, onBlur } = this.props.blockProps;

    return (
      <div className="text-editor-field">
        {field.readOnly ? this.renderBlocker() : null}

        <Controls editor={editor} />

        <Editor
          editorState={editor.state}
          onChange={editor.set.bind(editor)}
          onFocus={onFocus}
          onBlur={onBlur}
          handleKeyCommand={editor.handleKeyCommand.bind(editor)}
          handleBeforeInput={editor.handleBeforeInput.bind(editor)}
          handleReturn={editor.handleReturn.bind(editor)}
          customStyleMap={styleMap}
          readOnly={field.readOnly}
        />
      </div>
    );
  }

}

export default TextEditorBlock;
