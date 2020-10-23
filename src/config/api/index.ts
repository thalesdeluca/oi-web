import axios from "axios";

const api = axios.create({
  baseURL: "http://159.89.48.179/deliverie/",
});

export default api;
