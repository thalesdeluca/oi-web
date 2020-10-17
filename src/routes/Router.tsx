import React, { useContext } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Menu from "../layout/Menu";
import CompanyPage from "../pages/company";
import CompanyCategoryPage from "../pages/companyCategory";
import LoginPage from "../pages/login";
import PrivateRoute from './PrivateRoute'

import { useAuthGuard, useAdminGuard } from "../helpers/localStorage";
import { adminMenu, companyMenu } from "../layout/items";
import { CompanyContext } from "../contexts/CompanyContext";

const Router: React.FC = () => {
  const { isAdmin } = useContext(CompanyContext)

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <Menu routes={isAdmin ? adminMenu : companyMenu}>
          <PrivateRoute exact path="/company" component={CompanyPage} />
          <PrivateRoute exact path="/company-category" component={CompanyCategoryPage} />
        </Menu>
      </Switch>
    </BrowserRouter>
  );
};



export default Router;
