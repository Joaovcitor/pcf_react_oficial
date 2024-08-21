import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../pages/Login";
import Page404 from "../pages/Page404";

export default function Routes() {
  toast.success("Eu uso um ID personalizado", {
    toastId: "customId",
    theme: "dark",
  });
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
