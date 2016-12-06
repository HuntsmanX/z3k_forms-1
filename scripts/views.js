import React from "react";
import { Route } from 'mobx-router';

import Dashboard           from "./components/dashboard";
import Tests               from "./components/tests";
import MistakeTypes        from "./components/config/mistake-types";
import EditTest            from "./components/tests/edit-test";
import NotFound            from "./components/not-found";
import Responses           from "./components/responses";
import VerifyResponse      from "./components/responses/verify-response";
import NewResponse         from "./components/active-test/new-response";
import Start               from "./components/active-test/start";
import Finish              from "./components/active-test/finish";
import ResponseSection     from "./components/active-test/response-section";

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

  NewResponse: new Route({
    path:      '/responses/new',
    component: <NewResponse />,
    onEnter:   ({ s }) => s.activeTest.newResponse()
  }),

  verifyResponse: new Route({
    path:      '/responses/:id',
    component: <VerifyResponse />,
    onEnter:   ({ s, params }) => s.responses.show(params.id)
  }),

  mistakeTypes: new Route({
    path:      '/config/mistake-types',
    component: <MistakeTypes />,
    onEnter:   ({ s }) => s.mistakeTypes.list()
  }),

  start: new Route({
    path:       '/start/:id',
    component:  <Start />,
    onEnter:   ({ s, params }) => s.activeTest.start(params.id)
  }),

  editResponseSection: new Route({
    path:       '/test/:uid',
    component:   <ResponseSection />,
    onEnter:   ({ s, params }) => s.activeTest.showSection(params.uid)
  }),

  finish: new Route({
    path:       '/finish',
    component:   <Finish />,
    onEnter:    ({ s }) => s.activeTest.finish()
  }),

  notFound: new Route({
    path:     '*',
    component: <NotFound />
  })

}

export default views;
