import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "modules/auth";

const BaseRouter: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/login" render={() => <Auth />} />
        <Route exact path="/registration" render={() => <Auth isReg={true} />} />
        <Redirect to="/login" />
      </Switch>
    </React.Fragment>
  );
};

export default BaseRouter;