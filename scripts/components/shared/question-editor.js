import React, { Component } from "react";
import { Entity } from "draft-js";

import EolBlock from "./../question-fields/eol-block";

import FIELD_TYPES    from "./../../helpers/field-types";
import blockRenderMap from "./../../helpers/draft-renderer-map";
import styleMap       from "./../../helpers/draft-style-map";

// Abstract component, can't be rendered without being extended.

class QuestionEditor extends Component {

  render() {
    throw "render method must be defined by a child class";
  }

  get fieldPlaceholder() {
    throw "fieldPlaceholder getter method must be defined by a child class";
  }

  get blockRenderMap() {
    return blockRenderMap;
  }

  get styleMap() {
    return styleMap;
  }

  blockRenderer = (block) => {
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
          onFocus:         () => question.set('fieldActive', true),
          onBlur:          () => question.set('fieldActive', false),
          placeholder:     this.fieldPlaceholder
        }
      };

    }
  }

}

export default QuestionEditor;
