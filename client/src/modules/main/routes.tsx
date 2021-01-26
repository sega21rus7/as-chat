import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./Content";
import Login from "../auth";
import Component404 from "./404";
import UsersTable from "../admin";
import Profile from "../profile";

const BaseRouter: React.FC = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Content} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/admin/users" component={UsersTable} />
      <Route component={Component404} />
    </Switch>
  </React.Fragment>
);

export default BaseRouter;