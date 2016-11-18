import React, { Component } from "react";
import { observer } from "mobx-react";
import { Editor } from "draft-js";

import Controls from "./text-editor-block/controls";

import styleMap from "./../../helpers/draft-style-map";

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
          customStyleMap={styleMap}
          readOnly={field.readOnly}
        />
      </div>
    );
  }

}

export default TextEditorBlock;
