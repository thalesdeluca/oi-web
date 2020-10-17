import Company from '../../interfaces/Company'

const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem("delivery@access_token", token)
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("delivery@access_token")
};

const setCompanyToLocalStorage = (company: Company) => {
  localStorage.setItem("delivery@company", JSON.stringify(company))
};

const removeCompanyFromLocalStorage = () => {
  localStorage.removeItem("delivery@company")
};

const useAuthGuard = () => {
  return Boolean(localStorage.getItem("delivery@access_token"));
};

const useAdminGuard = () => {
  const companyStorage = localStorage.getItem("delivery@company")

  if (companyStorage) {
    return JSON.parse(companyStorage).is_admin
  }

  return false;
};

export { setTokenToLocalStorage, removeTokenFromLocalStorage, setCompanyToLocalStorage, removeCompanyFromLocalStorage, useAuthGuard, useAdminGuard }