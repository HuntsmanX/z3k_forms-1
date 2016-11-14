import React, { Component } from "react";

import Loader from "./loader";

class EntitiesList extends Component {

  render() {
    const {
      collection,
      component: ChildComponent
    } = this.props;

    if (collection.isBeingFetched) return <Loader />;

    return (
      <ul className="entities-list">
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
