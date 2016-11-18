import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import EntitiesListPanel from "./shared/entities-list-panel";
import EntitiesList      from "./shared/entities-list";
import Button            from "./shared/button";

import Response    from "./responses/response";


@inject("s")
@observer
class Responses extends Component {

  render() {
    const { s: { responses } } = this.props;
    return (
      <div>
        <EntitiesListPanel>
          <Button
            label="New Response"
            icon="add"
            onClick={responses.showNew.bind(responses, true)}
          />
        </EntitiesListPanel>
        <EntitiesList
          collection={responses.collection}
          component={Response}
        />
      </div>
    );
  }

}

export default Responses;
