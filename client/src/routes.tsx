import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "modules/auth";

const BaseRouter: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/auth" render={() => <Auth />} />
        <Route exact path="/reg" render={() => <Auth isReg={true} />} />
      </Switch>
    </React.Fragment>
  );
};

export default BaseRouter;