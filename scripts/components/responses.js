import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Pagination        from "./shared/pagination";
import EntitiesList      from "./shared/entities-list";
import Button            from "./shared/button";
import Response          from "./responses/response";
import Callout           from "./shared/callout";
import Search            from "./responses/search";

@inject("s")
@observer
class Responses extends Component {

  render() {
    const { s: { responses } } = this.props;
    return (
      <div>
        <Search responses={responses.collection} />
        <EntitiesList
          collection={responses.collection}
          component={Response}
        />
        <Pagination collection={responses.collection} />
      </div>
    );
  }

}

export default Responses;
