import React, { Component } from "react";

import Loader         from "./loader";
import LoadingWrapper from "./loading-wrapper";

class EntitiesList extends Component {

  render() {
    const {
      collection,
      component: ChildComponent
    } = this.props;

    if (collection.isBeingFetched && !collection.length) return <Loader />;

    return (
      <ul className="entities-list">
        {collection.isBeingFetched ? <LoadingWrapper /> : null}

        {collection.map(model => {
          return <ChildComponent key={model.uuid} model={model} />
        })}
      </ul>
    );
  }

}

EntitiesList.propTypes = {
  collection: React.PropTypes.shape({
    isBeingFetched: React.PropTypes.bool,
    models:         React.PropTypes.object
  })
}

export default EntitiesList;
