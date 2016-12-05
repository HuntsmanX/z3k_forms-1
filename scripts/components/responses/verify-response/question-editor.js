import React, { Component } from "react";
import { observer } from "mobx-react";
import { Editor } from "draft-js";

import QuestionEditor_ from "./../../shared/question-editor";

@observer
class QuestionEditor extends QuestionEditor_ {

  get fieldPlaceholder() {
    return "Answer";
  }

  render() {
    const { question: { editor } } = this.props;

    return (
      <div className="question-editor">
        <Editor
          blockRendererFn={this.blockRenderer}
          blockRenderMap={this.blockRenderMap}
          customStyleMap={this.styleMap}
          editorState={editor.state}
          readOnly
        />
      </div>
    );
  }

}

export default QuestionEditor;
