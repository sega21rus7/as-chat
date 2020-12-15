import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./Content";
import Login from "../Auth/Login";
import UsersTable from "../Admin/UsersTable";

const BaseRouter: React.FC = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Content} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/users" component={UsersTable} />
    </Switch>
  </div>
);

export default BaseRouter;