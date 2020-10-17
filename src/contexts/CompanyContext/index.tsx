import React, { FunctionComponent, useEffect, useState } from "react";
import { removeTokenFromLocalStorage, removeCompanyFromLocalStorage, setCompanyToLocalStorage, setTokenToLocalStorage } from "../../helpers/localStorage";

import Company from "../../interfaces/Company";

interface CompanyContextInterface {
  company: Company | undefined;
  setCompany: (company: Company) => void,
  isAdmin: boolean,
  authenticate: (company: Company, token: string) => void,
  logout: () => void,
}

export const CompanyContext = React.createContext<CompanyContextInterface>({
  company: undefined,
  setCompany: () => null,
  isAdmin: false,
  authenticate: () => null,
  logout: () => null,
});

const CompanyProvider: FunctionComponent = ({ children }) => {
  const [company, setCompany] = useState<Company>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const authenticate = (company: Company, token: string) => {
    setTokenToLocalStorage(token)
    setCompanyToLocalStorage(company)

    setCompany(company)
    setIsAdmin(company.is_admin)
  }

  const logout = () => {
    setCompany(undefined)
    setIsAdmin(false)

    removeCompanyFromLocalStorage()
    removeTokenFromLocalStorage()
  }

  useEffect(() => {
    const companyStorage = localStorage.getItem('delivery@company')

    if (companyStorage) {
      setCompany(JSON.parse(companyStorage))
      setIsAdmin(JSON.parse(companyStorage).is_admin)
    }
  }, [])

  return (
    <CompanyContext.Provider value={{ company, setCompany, authenticate, logout, isAdmin }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
