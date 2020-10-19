import React, { FunctionComponent, useEffect, useState } from "react";
import {
  removeTokenFromLocalStorage,
  removeCompanyFromLocalStorage,
  setCompanyToLocalStorage,
  setTokenToLocalStorage,
} from "../../helpers/localStorage";

import Company from "../../interfaces/Company";
import Axios from "axios";
import { findCompanyById } from "../../requests";
import Image from "../../interfaces/Image";

interface CompanyContextInterface {
  company: Company | undefined;
  setCompany: (company: Company) => void;
  isAdmin: boolean;
  authenticate: (company: Company, token: string) => void;
  logout: () => void;
  setPhoto: (profileImage: Image) => void;
  update: (a: number) => any;
}

export const CompanyContext = React.createContext<CompanyContextInterface>({
  company: undefined,
  setCompany: () => null,
  isAdmin: false,
  authenticate: () => null,
  logout: () => null,
  setPhoto: (profileImage: Image) => null,
  update: (a: number) => null,
});

const CompanyProvider: FunctionComponent = ({ children }) => {
  const [company, setCompany] = useState<Company>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const authenticate = (company: Company, token: string) => {
    setTokenToLocalStorage(token);
    setCompanyToLocalStorage(company);

    setCompany(company);
    setIsAdmin(company.is_admin);
  };

  const logout = () => {
    setCompany(undefined);
    setIsAdmin(false);

    removeCompanyFromLocalStorage();
    removeTokenFromLocalStorage();
  };

  const update = async (id: number) => {
    const { data } = await findCompanyById({ id });
    localStorage.setItem("delivery@company", JSON.stringify(data));
    setCompany(data);
    setIsAdmin(data.is_admin);
    return data;
  };

  useEffect(() => {
    const init = async () => {
      const companyStorage = localStorage.getItem("delivery@company");

      if (companyStorage) {
        const data = await update(JSON.parse(companyStorage)?.id);

        if (!data) {
          setCompany(JSON.parse(companyStorage));
          setIsAdmin(JSON.parse(companyStorage).is_admin);
        }
      }
    };

    init();
  }, []);

  const setPhoto = (profileImage: Image): void => {
    const cloneCompany = company;

    if (cloneCompany && profileImage) {
      cloneCompany.profileImages = profileImage;

      setCompany({ ...cloneCompany });
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        setCompany,
        authenticate,
        logout,
        isAdmin,
        update,
        setPhoto,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
