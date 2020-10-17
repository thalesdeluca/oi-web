import React from "react";

interface Props {
  children: object;
  route: object;
}

const CompanyPage: React.FC<Props> = () => {
  return (
    <div>
      <span>company page</span>
    </div>
  );
};

export default CompanyPage;
