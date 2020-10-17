import Company from '../../interfaces/Company'

const getToken = () => {
  return localStorage.getItem("delivery@access_token");
};

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
}

export { setTokenToLocalStorage, removeTokenFromLocalStorage, setCompanyToLocalStorage, removeCompanyFromLocalStorage, getToken }