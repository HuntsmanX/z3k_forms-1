import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import EntitiesListPanel from "./shared/entities-list-panel";
import EntitiesList      from "./shared/entities-list";
import Button            from "./shared/button";
import Pagination        from "./shared/pagination";
import Callout           from "./shared/callout";
import SearchForm, {
    Fieldset,
    FormFooter,
    FormField
} from "./shared/search-form";

import NewTest from "./tests/new-test";
import Test    from "./tests/test";

@inject("s")
@observer
class Tests extends Component {

  render() {
    const { s: { tests } } = this.props;

    return (
      <div>
        <SearchForm onSubmit={tests.collection.fetch.bind(tests.collection)}>
          <Callout color="secondary">
            <Fieldset legend="Filter">
              <div className="row small-up-1 medium-up-2 large-up-4">
                <FormField collection={tests.collection} label="Name"    attr="name_cont" />
              </div>
            </Fieldset>
            <FormFooter>
              <Button type="submit" label="Search" icon="done" />
            </FormFooter>
          </Callout>
        </SearchForm>

        <NewTest />
        <EntitiesListPanel>
          <Button
            label="New Test"
            icon="add"
            onClick={tests.showNew.bind(tests, true)}
          />
        </EntitiesListPanel>
        <EntitiesList
          collection={tests.collection}
          component={Test}
        />
        <Pagination collection={tests.collection} />
      </div>
    );
  }

}

export default Tests;
