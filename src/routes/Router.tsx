import React, { useContext } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Menu from "../layout/Menu";
import CompanyCategoryPage from "../pages/Admin/CompanyCategory";
import ProductCategoryPage from "../pages/Admin/ProductCategory";
import ProductPage from "../pages/Company/Product";
import OrderPage from "../pages/Company/Order";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Company/Profile";
import PrivateRoute from "./PrivateRoute";

import { adminMenu, companyMenu } from "../layout/items";
import { CompanyContext } from "../contexts/CompanyContext";
import ProductCategoryProvider from "../contexts/ProductCategoryContext";
import OrderProvider from "../contexts/OrderContext";

const Router: React.FC = () => {
  const { isAdmin } = useContext(CompanyContext);

  return (
    <BrowserRouter basename="/deliverie-front">
      <Switch>
        <Route path="/login" component={LoginPage} />

        <Menu routes={isAdmin ? adminMenu : companyMenu}>
          <PrivateRoute exact path="/profile" component={ProfilePage} />

          <PrivateRoute
            exact
            path="/company-category"
            component={CompanyCategoryPage}
          />
          <PrivateRoute
            exact
            path="/product-category"
            component={ProductCategoryPage}
          />
          <ProductCategoryProvider>
            <PrivateRoute exact path="/product" component={ProductPage} />
          </ProductCategoryProvider>
          <OrderProvider>
            <PrivateRoute exact path="/order" component={OrderPage} />
          </OrderProvider>
        </Menu>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
