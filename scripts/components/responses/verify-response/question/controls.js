import React, { Component } from "react";
import { observer } from "mobx-react";

import InsertControls from "./insert-controls";
import StyleControls  from "./style-controls";

@observer
class Controls extends Component {

  render() {
    const { question } = this.props;
    const { editor }   = question;

    return (
      <div className="clearfix question-controls">
        <div className="controls float-left">
          <InsertControls
            onToggle={question.insertField.bind(question)}
          />
        </div>

        <div className="controls float-right">
          <StyleControls
            editorState={editor.state}
            onBlockToggle={editor.toggleBlockType.bind(editor)}
            onInlineToggle={editor.toggleInlineStyle.bind(editor)}
          />
        </div>
      </div>
    );
  }

}

export default Controls;
