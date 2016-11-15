import ui     from "./stores/ui";
import tests  from "./stores/tests";
import router from "./stores/router";

const stores = {
  router,
  ui,
  tests
};

router.start(stores);

export default stores;
