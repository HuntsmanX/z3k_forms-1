import router       from "./stores/router";
import ui           from "./stores/ui";
import tests        from "./stores/tests";
import responses    from "./stores/responses";
import activeTest   from "./stores/active-test";
import mistakeTypes from "./stores/mistake-types";

const stores = {
  router,
  ui,
  tests,
  responses,
  activeTest,
  mistakeTypes
};

router.start(stores);

export default stores;
