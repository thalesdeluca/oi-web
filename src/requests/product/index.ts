import { getToken } from "../../helpers/localStorage";

import api from "../../config/api";

const createProduct = async ({
  name,
  price,
  product_category_id,
}: {
  name: string;
  price: number;
  product_category_id: number;
}) => {
  const token = getToken();

  return api.post(
    "/products",
    {
      name,
      price,
      product_category_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const updateProduct = async ({
  id,
  name,
  price,
  product_category_id,
}: {
  id: number;
  name: string;
  price: number;
  product_category_id: number;
}) => {
  const token = getToken();

  return api.put(
    `/products/${id}`,
    {
      name,
      price,
      product_category_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteProduct = async ({ id }: { id: number }) => {
  const token = getToken();

  return api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getOwnProducts = async ({}: {}) => {
  const token = getToken();

  return api.get("/me/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { createProduct, getOwnProducts, deleteProduct, updateProduct };
