import React from "react";
import { render } from "react-dom";
import { useStrict } from "mobx";

import App from "./components/app";

useStrict(true);

render(
  <App />,
  document.getElementById("root")
);
