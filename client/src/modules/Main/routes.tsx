import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./Content";
import Login from "../Auth/Login";

const BaseRouter: React.FC = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Content} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </div>
);

export default BaseRouter;