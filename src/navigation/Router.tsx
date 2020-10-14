import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import useAuthGuard from "../components/useAuthGuard";
import UnloggedRoutes from "./UnloggedRoutes";
import LoggedRoutes from "./LoggedRoutes";

const Router: React.FC = () => {
  const isAuthenticated = useAuthGuard();

  return (
    <BrowserRouter>
      <Switch>{isAuthenticated ? UnloggedRoutes() : LoggedRoutes()}</Switch>
    </BrowserRouter>
  );
};

export default Router;
