import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./Content";
import ChangePassword from "./ChangePassword";

const ProfileRouter: React.FC = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/profile" component={Content} />
      <Route exact path="/profile/change_password" component={ChangePassword} />
    </Switch>
  </React.Fragment>
);

export default ProfileRouter;