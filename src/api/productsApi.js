import axios from "axios";

const API = "https://693839d74618a71d77cf70b6.mockapi.io/products";

export const getProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getProduct = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const addProduct = async (body) => {
  const res = await axios.post(API, body);
  return res.data;
};

export const updateProduct = async ({ id, body }) => {
  const res = await axios.put(`${API}/${id}`, body);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
