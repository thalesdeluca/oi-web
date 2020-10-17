import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { CompanyContext } from "../contexts/CompanyContext";
import { getToken } from "../helpers/localStorage";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {

  const hasToken = getToken()

  return hasToken
    ? (
      <Route path={props.path} exact={props.exact} component={props.component} />
    )
    :
    (
      <Redirect to="/login" />
    );
};

export default PrivateRoute