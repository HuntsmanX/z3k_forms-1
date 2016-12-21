import router       from "./stores/router";
import ui           from "./stores/ui";
import tests        from "./stores/tests";
import responses    from "./stores/responses";
import activeTest   from "./stores/active-test";
import session      from "./stores/session";
import mistakeTypes from "./stores/mistake-types";
import roles        from "./stores/roles";
import users        from "./stores/users";

const stores = {
  router,
  ui,
  tests,
  responses,
  activeTest,
  session,
  mistakeTypes,
  roles,
  users
};

router.start(stores);

export default stores;
