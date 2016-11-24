import ui        from "./stores/ui";
import tests     from "./stores/tests";
import responses from "./stores/responses";
import sections  from "./stores/sections";
import router    from "./stores/router";

const stores = {
  router,
  ui,
  tests,
  responses,
  sections
};

router.start(stores);

export default stores;
