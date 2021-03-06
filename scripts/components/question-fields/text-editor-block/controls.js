import React, { Component } from "react";
import { observer } from "mobx-react";

import StyleButton from "./style-button";

const INLINE_STYLES = [
  { icon: 'format_bold',       value: 'BOLD',      title: 'Bold' },
  { icon: 'format_italic',     value: 'ITALIC',    title: 'Italic' },
  { icon: 'format_underlined', value: 'UNDERLINE', title: 'Underlined' },
  { icon: 'code',              value: 'CODE',      title: 'Code' }
];

const BLOCK_TYPES = [
  { icon: 'format_list_bulleted', value: 'unordered-list-item', title: 'Unordered List' },
  { icon: 'format_list_numbered', value: 'ordered-list-item',   title: 'Ordered List' },
  { icon: 'code',                 value: 'code-block',          title: 'Code' }
];

@observer
class Controls extends Component {

  renderControls() {
    const { editor, editor: { state }, mistakeTypes } = this.props;
    const selection = state.getSelection();
    const blockType = state
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    const currentStyle = state.getCurrentInlineStyle();

    return (
      <div className="controls">
        {BLOCK_TYPES.map(type =>
          <StyleButton
            key={type.icon}
            active={type.value === blockType}
            icon={type.icon}
            iconTitle={type.title}
            onToggle={editor.toggleBlockType.bind(editor)}
            value={type.value}
          />
        )}
        &nbsp;&nbsp;|&nbsp;&nbsp;
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.icon}
            active={currentStyle.has(type.value)}
            icon={type.icon}
            iconTitle={type.title}
            onToggle={editor.toggleInlineStyle.bind(editor)}
            value={type.value}
          />
        )}
      </div>
    );
  }

  renderMistakeControls() {
    const { editor, mistakeTypes } = this.props;

    return (
      <div className="controls">
        {mistakeTypes.map(mt => {
          return <span
            key={mt.id}
            className={`style-button`}
            onMouseDown={editor.markMistake.bind(editor, mt.identifier)}
          >
            {`${mt.name} `}
          </span>;
        })}
      </div>
    );
  }

  render() {
    const { editor: { showMistakeControls } } = this.props;

    return showMistakeControls ?
      this.renderMistakeControls() :
      this.renderControls();
  }

}

export default Controls;
