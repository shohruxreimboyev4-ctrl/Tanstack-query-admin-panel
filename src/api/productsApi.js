import axios from "axios";

const API = "https://693839d74618a71d77cf70b6.mockapi.io/products";

// Hammasini olish
export const getProducts = async () => {
  const res = await axios.get(API);
  // Ma'lumotlarni normalize qilish
  return res.data.map(product => ({
    ...product,
    image: product.image || product.img || "https://via.placeholder.com/300x300?text=No+Image",
    title: product.title || "Nomi yo'q",
    price: product.price || 0,
  }));
};

// Bitta product olish
export const getProduct = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  // Ma'lumotlarni normalize qilish
  return {
    ...res.data,
    image: res.data.image || res.data.img || "https://via.placeholder.com/300x300?text=No+Image",
    title: res.data.title || "Nomi yo'q",
    price: res.data.price || 0,
  };
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
