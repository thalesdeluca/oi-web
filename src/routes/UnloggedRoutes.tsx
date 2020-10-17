import React from "react";

import LoginScreen from "../pages/login";
import { Route, Redirect } from "react-router-dom";

const UnloggedRoutes = () => {
  return (
    <>
      <Route path="/login" component={LoginScreen} />
      <Redirect to="/login" />
    </>
  );
};

export default UnloggedRoutes;
