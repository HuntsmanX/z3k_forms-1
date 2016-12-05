import ui         from "./stores/ui";
import tests      from "./stores/tests";
import responses  from "./stores/responses";
import router     from "./stores/router";
import activeTest from "./stores/active-test";

const stores = {
  router,
  ui,
  tests,
  responses,
  activeTest
};

router.start(stores);

export default stores;
