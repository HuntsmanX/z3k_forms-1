import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Pagination        from "./shared/pagination";
import EntitiesList      from "./shared/entities-list";
import Button            from "./shared/button";
import Response          from "./responses/response";
import Callout           from "./shared/callout";

import SearchForm, {
    Fieldset,
    FormFooter,
    FormField
} from "./shared/search-form";


@inject("s")
@observer
class Responses extends Component {

  render() {
    const { s: { responses } } = this.props;
    return (
      <div>
        <SearchForm onSubmit={responses.collection.fetch.bind(responses.collection)}>
          <Callout color="secondary">
            <Fieldset legend="Filter">
              <div className="row small-up-1 medium-up-2 large-up-4">
                <FormField collection={responses.collection} label="Name"    attr="name_cont" />
              </div>
            </Fieldset>
            <FormFooter>
              <Button type="submit" label="Search" icon="done" />
            </FormFooter>
          </Callout>
        </SearchForm>

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
