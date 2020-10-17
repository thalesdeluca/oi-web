import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { CompanyContext } from "../contexts/CompanyContext";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {

  const { isAuthenticated } = useContext(CompanyContext)

  return isAuthenticated
    ? (
      <Route path={props.path} exact={props.exact} component={props.component} />
    )
    :
    (
      <Redirect to="/page/login" />
    );
};

export default PrivateRoute