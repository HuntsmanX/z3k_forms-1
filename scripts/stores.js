import ui        from "./stores/ui";
import tests     from "./stores/tests";
import responses from "./stores/responses";
import router    from "./stores/router";

const stores = {
  router,
  ui,
  tests,
  responses
};

router.start(stores);

export default stores;
