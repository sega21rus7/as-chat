import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./Content";

const BaseRouter: React.FC = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Content} />
    </Switch>
  </React.Fragment>
);

export default BaseRouter;