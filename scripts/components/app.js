import React from "react";
import { Provider } from "mobx-react";

import DevTools from "mobx-react-devtools";

import Router         from "./app/router";
import ContentWrapper from "./app/content-wrapper";

import stores from "./../stores";

const App = () => (
  <Provider s={stores}>
    <ContentWrapper>
      <Router />
      <DevTools />
    </ContentWrapper>
  </Provider>
);

export default App;
