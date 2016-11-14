import React from "react";
import { observer } from "mobx-react";

const Router = ({ s: { router } }) => (
  <div>{router.currentView && router.currentView.component}</div>
);

export default observer(['s'], Router);
