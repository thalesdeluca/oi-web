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

export { setTokenToLocalStorage, removeTokenFromLocalStorage, setCompanyToLocalStorage, removeCompanyFromLocalStorage, useAuthGuard }