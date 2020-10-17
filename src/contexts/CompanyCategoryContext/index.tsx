import React, { FunctionComponent, useState } from "react";

import CompanyCategory from "../../interfaces/CompanyCategory";

interface CompanyCategoryContextInterface {
  companyCategories: CompanyCategory[];
  setCompanyCategories: (companyCategories: CompanyCategory[]) => void,
}

export const CompanyCategoryContext = React.createContext<CompanyCategoryContextInterface>({
  companyCategories: [],
  setCompanyCategories: () => null,
});

const CompanyCategoryProvider: FunctionComponent = ({ children }) => {
  const [companyCategories, setCompanyCategories] = useState<CompanyCategory[]>([]);

  return (
    <CompanyCategoryContext.Provider value={{ companyCategories, setCompanyCategories }}>
      {children}
    </CompanyCategoryContext.Provider>
  );
};

export default CompanyCategoryProvider;
