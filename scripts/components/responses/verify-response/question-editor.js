import React, { Component } from "react";
import { observer } from "mobx-react";
import { Entity, Editor } from "draft-js";

import FIELD_TYPES    from "../../../helpers/field-types";
import blockRenderMap from "../../../helpers/draft-renderer-map";
import styleMap       from "../../../helpers/draft-style-map";

import EolBlock from "../../question-fields/eol-block";

@observer
class QuestionEditor extends Component {

  blockRenderer(block) {
    if (block.getType() !== 'atomic') return;

    const entityType = Entity.get(block.getEntityAt(0)).getType();
    const fieldType  = FIELD_TYPES.find(f => entityType === f.name);

    const { question } = this.props;

    if (entityType === 'eol-block') {
      return {
        component: EolBlock,
        editable:  false,
        props:     { atomicBlockType: 'eol-block' }
      };

    } else if (fieldType) {

      const field = question.fields.find({ blockKey: block.getKey() });

      return {
        component: fieldType.component,
        editable:  false,
        props:     {
          atomicBlockType: entityType,
          field:           field,
          onFocus:         question.set.bind(question, 'fieldActive', true),
          onBlur:          question.set.bind(question, 'fieldActive', false),
          placeholder:     'Correct Answer'
        }
      };

    }
  }

  render() {
    const { question: { editor } } = this.props;

    return (
      <div className="question-editor">
          <Editor
            blockRendererFn={this.blockRenderer.bind(this)}
            blockRenderMap={blockRenderMap}
            customStyleMap={styleMap}
            editorState={editor.state}
          />
      </div>
    );
  }

}

export default QuestionEditor;
