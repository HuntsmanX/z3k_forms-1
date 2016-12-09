import React, { Component } from "react";
import { Provider, observer } from "mobx-react";

import DevTools from "mobx-react-devtools";

import Router from "./app/router";
import Loader from "./shared/loader";

import stores from "./../stores";

@observer
class App extends Component {

  render() {
    if (stores.ui.isInitializing) return <Loader />;

    return (
      <Provider s={stores}>
        <div>
          <Router />
          <DevTools />
        </div>
      </Provider>
    );
  }

}

export default App;
