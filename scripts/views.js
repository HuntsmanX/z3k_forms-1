import React from "react";
import { Route } from 'mobx-router';

import MainLayout   from "./components/layouts/main-layout";
import SignInLayout from "./components/layouts/sign-in-layout";

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
import SignIn              from "./components/sign-in";

const views = {

  signIn: {
    path:        '/sign-in',
    component:   SignIn,
    layout:      SignInLayout,
    skipAuth:    true,
    beforeEnter: ({ s }) => {
      if (!s.session.user.isSignedIn) return true;
      if (s.router.currentView) return false;
      s.router.navigate('dashboard');
      return false;
    },
    onEnter:     ({ s, params }) => s.session.newSession()
  },

  dashboard: {
    path:      '/',
    component: Dashboard
  },

  tests: {
    path:      '/tests',
    component: Tests,
    onEnter:   ({ s }) => s.tests.list()
  },

  editTest: {
    path:      '/tests/:id',
    component: EditTest,
    onEnter:   ({ s, params }) => s.tests.show(params.id)
  },

  responses: {
    path:      '/responses',
    component: Responses,
    onEnter:   ({ s }) => s.responses.list()
  },

  newResponse: {
    path:      '/responses/new',
    component: NewResponse,
    onEnter:   ({ s }) => s.activeTest.newResponse()
  },

  verifyResponse: {
    path:      '/responses/:id',
    component: VerifyResponse,
    onEnter:   ({ s, params }) => s.responses.show(params.id)
  },

  mistakeTypes: {
    path:      '/config/mistake-types',
    component: MistakeTypes,
    onEnter:   ({ s }) => s.mistakeTypes.list()
  },

  start: {
    path:      '/start/:id',
    component: Start,
    skipAuth:  true,
    onEnter:   ({ s, params }) => s.activeTest.start(params.id)
  },

  editResponseSection: {
    path:      '/test/:uid',
    component: ResponseSection,
    skipAuth:  true,
    onEnter:   ({ s, params }) => s.activeTest.showSection(params.uid)
  },

  finish: {
    path:      '/finish',
    component: Finish,
    skipAuth:  true,
    onEnter:   ({ s }) => s.activeTest.finish()
  },

  notFound: {
    path:      '*',
    component: NotFound
  }

}

Object.keys(views).forEach(key => {
  const route = Object.assign({}, views[key]);

  const Layout    = route.layout || MainLayout;
  const Component = route.component;

  route.component = <Layout><Component/></Layout>;

  if (!route.skipAuth) {
    route.beforeEnter = (options) => options.s.router.checkAuth(options)
  }

  delete route.layout;
  delete route.skipAuth;

  views[key] = new Route(route);
});

export default views;
