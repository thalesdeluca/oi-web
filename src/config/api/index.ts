import axios from "axios";

const api = axios.create({
  baseURL: "https://continuelab.com.br/deliverie",
});

export default api;
