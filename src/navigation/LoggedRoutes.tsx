import React from "react";
import { Route, Redirect } from "react-router-dom";
import Menu from "../layout/Menu";
import { authMenu } from "../layout/items";
import UserScreen from "../screens/user";

const LoggedRoutes = () => {
  return (
    <Menu routes={authMenu}>
      <Route path="/user" component={UserScreen} />
      <Redirect to="/user" />
    </Menu>
  );
};

export default LoggedRoutes;
