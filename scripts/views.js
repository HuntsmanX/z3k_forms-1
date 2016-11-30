import React from "react";
import { Route } from 'mobx-router';

import Dashboard           from "./components/dashboard";
import Tests               from "./components/tests";
import EditTest            from "./components/tests/edit-test";
import NotFound            from "./components/not-found";
import Responses           from "./components/responses";
import VerifyResponse      from "./components/responses/verify-response";
import NewResponse         from "./components/responses/new-response";
import Start               from "./components/start";
import Finish              from "./components/finish";
import EditResponseSection from "./components/responses/edit-response-section";

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

  verifyResponse: new Route({
    path:      '/responses/:id',
    component: <VerifyResponse />,
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

  editResponseSection: new Route({
    path:       '/responses/sections/:id',
    component:   <EditResponseSection />,
    onEnter:   ({ s, params }) => s.sections.edit(params.id)
  }),

  finish: new Route({
    path:       '/finish',
    component:   <Finish />
  }),

  notFound: new Route({
    path:     '*',
    component: <NotFound />
  })

}

export default views;
