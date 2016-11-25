import React, { Component } from "react";
import { observer } from "mobx-react";
import { Editor } from "draft-js";

import QuestionEditor_ from "./../../shared/question-editor";

@observer
class QuestionEditor extends QuestionEditor_ {

  get fieldPlaceholder() {
    return "Correct Answer";
  }

  render() {
    const { question, question: { editor } } = this.props;

    return (
      <div className="question-editor">
        <Editor
          blockRendererFn={this.blockRenderer}
          blockRenderMap={this.blockRenderMap}
          customStyleMap={this.styleMap}
          editorState={editor.state}
          onChange={editor.set.bind(editor)}
          handleKeyCommand={editor.handleKeyCommand.bind(editor)}
          readOnly={question.readOnly}
          handleReturn={editor.handleReturn.bind(editor)}
          ref={question.assignInputRef.bind(question)}
        />
      </div>
    );
  }

}

export default QuestionEditor;
