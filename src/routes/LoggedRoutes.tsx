import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authMenu } from "../layout/items";

import Menu from "../layout/Menu";
import CompanyPage from "../pages/company";

const LoggedRoutes = () => {
  return (
    <Menu routes={authMenu}>
      <Route path="/company" component={CompanyPage} />
      <Redirect to="/company" />
    </Menu>
  );
};

export default LoggedRoutes;
