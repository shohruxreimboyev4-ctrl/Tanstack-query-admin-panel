import axios from "axios";

const API = "https://693839d74618a71d77cf70b6.mockapi.io/products";

// Hammasini olish
export const getProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Bitta product olish
export const getProduct = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// Product qo'shish
export const addProduct = async (body) => {
  const res = await axios.post(API, body);
  return res.data;
};

// Productni update qilish
export const updateProduct = async ({ id, body }) => {
  const res = await axios.put(`${API}/${id}`, body);
  return res.data;
};

// Productni o'chirish
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
