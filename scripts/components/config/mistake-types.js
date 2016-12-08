import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import EntitiesListPanel from "./../shared/entities-list-panel";
import EntitiesList      from "./../shared/entities-list";
import Button            from "./../shared/button";
import Pagination        from "./../shared/pagination";

import NewMistakeType from "./mistake-types/new-mistake-type";
import MistakeType    from "./mistake-types/mistake-type";

@inject("s")
@observer
class MistakeTypes extends Component {

  render() {

    const { s: { mistakeTypes } } = this.props;
    
    return (
      <div>
        <NewMistakeType />
        <EntitiesListPanel>
          <Button
            label="New Mistake Type"
            icon="add"
            onClick={mistakeTypes.showNew.bind(mistakeTypes, true)}
          />
        </EntitiesListPanel>
        <EntitiesList
          collection={mistakeTypes.collection}
          component={MistakeType}
        />
        <Pagination collection={mistakeTypes.collection} />
      </div>
    );
  }

}

export default MistakeTypes;
