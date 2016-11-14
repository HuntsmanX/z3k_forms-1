import React, { Component } from "react";

class EntitiesListPanel extends Component {

  render() {
    return (
      <div className="entities-list-panel clearfix">
        <div className="float-right">
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default EntitiesListPanel;
