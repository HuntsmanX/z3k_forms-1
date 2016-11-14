import ui     from "./stores/ui";
import tests  from "./stores/tests";

import { RouterStore, startRouter } from 'mobx-router';

import views from "./views";

const stores = {
  router: new RouterStore(),
  ui,
  tests
};

startRouter(views, stores);

export default stores;
