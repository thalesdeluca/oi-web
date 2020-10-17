import React, { useContext } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Menu from "../layout/Menu";
import CompanyPage from "../pages/Company";
import CompanyCategoryPage from "../pages/CompanyCategory";
import ProductCategoryPage from "../pages/ProductCategory";
import LoginPage from "../pages/Login";
import PrivateRoute from './PrivateRoute'

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
          <PrivateRoute exact path="/product-category" component={ProductCategoryPage} />
        </Menu>
      </Switch>
    </BrowserRouter>
  );
};



export default Router;
