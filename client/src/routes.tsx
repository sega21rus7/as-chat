import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "modules/auth/Auth";
import Chat from "modules/chat/Chat";
import { useSelector } from "tools/hooks";

const BaseRouter: React.FC = () => {
  const isAuth = useSelector(state => !!state.auth.user?._id);
  if (isAuth) {
    return (
      <Switch>
        <Route exact path="/im" component={Chat} />
        <Redirect to="/im" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/login" render={() => <Auth />} />
      <Route exact path="/registration" render={() => <Auth isReg />} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default BaseRouter;