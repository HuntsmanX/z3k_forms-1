import React from "react";
import { Provider } from "mobx-react";

import Router         from "./app/router";
import ContentWrapper from "./app/content-wrapper";

import stores from "./../stores";

const App = () => (
  <Provider s={stores}>
    <ContentWrapper>
      <Router />
    </ContentWrapper>
  </Provider>
);

export default App;
