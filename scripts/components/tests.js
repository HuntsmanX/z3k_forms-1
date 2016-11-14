import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import EntitiesListPanel from "./shared/entities-list-panel";
import EntitiesList      from "./shared/entities-list";
import Button            from "./shared/button";

import NewTest from "./tests/new-test";
import Test    from "./tests/test";

@inject("s")
@observer
class Tests extends Component {

  componentDidMount() {
    this.props.s.ui.setPageTitle("Tests");
    this.props.s.tests.list();
  }

  render() {
    const { s: { tests } } = this.props;

    return (
      <div>
        <NewTest />
        <EntitiesListPanel>
          <Button
            label="New Test"
            icon="add"
            onClick={tests.showNew.bind(null, true)}
          />
        </EntitiesListPanel>
        <EntitiesList
          collection={tests.collection}
          component={Test}
        />
      </div>
    );
  }

}

export default Tests;