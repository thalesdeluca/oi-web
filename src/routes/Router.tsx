import React, { useContext } from "react";
import { Switch, BrowserRouter } from "react-router-dom";

import UnloggedRoutes from "./UnloggedRoutes";
import LoggedRoutes from "./LoggedRoutes";

import { CompanyContext } from "../contexts/CompanyContext";

const Router: React.FC = () => {
  const { isAuthenticated } = useContext(CompanyContext)

  return (
    <BrowserRouter>
      <Switch>{isAuthenticated ? LoggedRoutes() : UnloggedRoutes()}</Switch>
    </BrowserRouter>
  );
};

export default Router;
