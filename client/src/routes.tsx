import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "modules/auth/Auth";
import Chat from "modules/chat/Chat";

const BaseRouter: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/login" render={() => <Auth />} />
        <Route exact path="/registration" render={() => <Auth isReg={true} />} />
        <Route exact path="/im" component={Chat} />
        <Redirect to="/im" />
      </Switch>
    </React.Fragment>
  );
};

export default BaseRouter;