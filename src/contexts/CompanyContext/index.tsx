import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { removeTokenFromLocalStorage, removeCompanyFromLocalStorage, setCompanyToLocalStorage, setTokenToLocalStorage } from "../../helpers/localStorage";

import Company from "../../interfaces/Company";

interface CompanyContextInterface {
  company: Company | undefined;
  setCompany: (company: Company) => void,
  isAuthenticated: boolean,
  isAdmin: boolean,
  authenticate: (company: Company, token: string) => void,
  logout: () => void,
}

export const CompanyContext = React.createContext<CompanyContextInterface>({
  company: undefined,
  setCompany: () => null,
  isAuthenticated: false,
  isAdmin: false,
  authenticate: () => null,
  logout: () => null,
});

const CompanyProvider: FunctionComponent = ({ children }) => {
  const [company, setCompany] = useState<Company>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const authenticate = (company: Company, token: string) => {
    setTokenToLocalStorage(token)
    setCompanyToLocalStorage(company)

    setCompany(company)
    setIsAuthenticated(true)
    setIsAdmin(company.is_admin)
  }

  const logout = () => {
    setCompany(undefined)
    setIsAuthenticated(false)
    setIsAdmin(false)

    removeCompanyFromLocalStorage()
    removeTokenFromLocalStorage()
  }

  useEffect(() => {
    const companyStorage = localStorage.getItem('delivery@company')

    if (companyStorage) {
      setIsAuthenticated(true)
      setCompany(JSON.parse(companyStorage))
    }
  }, [])

  return (
    <CompanyContext.Provider value={{ company, setCompany, isAuthenticated, authenticate, logout, isAdmin }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
