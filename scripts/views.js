import React from "react";
import { Route } from 'mobx-router';

import Dashboard    from "./components/dashboard";
import Tests        from "./components/tests";
import EditTest     from "./components/tests/edit-test";
import NotFound     from "./components/not-found";
import Responses    from "./components/responses";
import EditResponse from "./components/responses/edit-response";
import NewResponse  from "./components/responses/new-response";
import Start        from "./components/start";

const views = {

  dashboard: new Route({
    path:      '/',
    component: <Dashboard />
  }),

  tests: new Route({
    path:      '/tests',
    component: <Tests />,
    onEnter:   ({ s }) => s.tests.list()
  }),

  editTest: new Route({
    path:      '/tests/:id',
    component: <EditTest />,
    onEnter:   ({ s, params }) => s.tests.show(params.id)
  }),

  responses: new Route({
    path:       '/responses',
    component:  <Responses />,
    onEnter:   ({ s }) => s.responses.list()
  }),

  editResponse: new Route({
    path:      '/responses/:id',
    component: <EditResponse />,
    onEnter:   ({ s, params }) => s.responses.show(params.id)
  }),

  NewResponse: new Route({
    path:      '/new-response',
    component: <NewResponse />,
    onEnter:   ({ s }) => s.responses.showNew()
  }),

  start: new Route({
    path:       '/start',
    component:  <Start />,
    onEnter:   ({ s, params }) => s.responses.start(params.id)
  }),

  notFound: new Route({
    path:     '*',
    component: <NotFound />
  })

}

export default views;
