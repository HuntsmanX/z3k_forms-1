import React from "react";
import { Route } from 'mobx-router';

import Dashboard from "./components/dashboard";
import Tests     from "./components/tests";
import EditTest  from "./components/tests/edit-test";
import NotFound  from "./components/not-found";

const views = {

  dashboard: new Route({
    path: '/',
    component: <Dashboard />
  }),

  tests: new Route({
    path: '/tests',
    component: <Tests />
  }),

  editTest: new Route({
    path: '/tests/:id',
    component: <EditTest />
  }),

  notFound: new Route({
    path: '*',
    component: <NotFound />
  })

}

export default views;
