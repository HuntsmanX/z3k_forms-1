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

  get styleMap() {
    this.props.s.ui.getData('mistakeTypes').each(
      mt => styleMap[mt.identifier] = { backgroundColor: mt.color }
    )
    return styleMap;
  }

  render() {
    const { field, field: { editor }, onFocus, onBlur } = this.props.blockProps;
    const mistakeTypes = this.props.s.ui.getData('mistakeTypes');

    return (
      <div className="text-editor-field">
        {field.readOnly ? this.renderBlocker() : null}

        <Controls editor={editor} mistakeTypes={mistakeTypes} />

        <Editor
          editorState={editor.state}
          onChange={editor.set.bind(editor)}
          onFocus={onFocus}
          onBlur={onBlur}
          handleKeyCommand={editor.handleKeyCommand.bind(editor)}
          handleBeforeInput={editor.handleBeforeInput.bind(editor)}
          handleReturn={editor.handleReturn.bind(editor)}
          customStyleMap={this.styleMap}
          readOnly={field.readOnly}
        />
      </div>
    );
  }

}

export default TextEditorBlock;
