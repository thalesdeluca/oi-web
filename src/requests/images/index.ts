import api from "../../config/api";
import { getToken } from "../../helpers/localStorage";

const uploadCompany = async (data: FormData) => {
  const token = getToken();

  return api.post("/upload/company", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};

const uploadProduct = async (data: FormData) => {
  const token = getToken();

  return api.post("/upload/product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};

export { uploadCompany, uploadProduct };
