import React, { Component } from "react";
import { observer } from "mobx-react";

import { Row, Column } from "react-foundation-components/lib/global/grid-flex";

import Icon from "./../shared/icon";

@observer
class FieldExpand extends Component {

  render() {
    const { field, children } = this.props;

    if (!field.isExpandable) return null;

    const icon = field.isExpanded ?
      'keyboard_arrow_left' :
      'keyboard_arrow_right';

    const title = field.isExpanded ?
      'Hide correct answer' :
      'Show correct answer';

    return (
      <div className="field-expand">
        <Icon
          className="action"
          onClick={() => field.toggleExpand()}
          title={title}
        >
          {icon}
        </Icon>
        {field.isExpanded ? children : null}
      </div>
    );
  }

}

export default FieldExpand;
