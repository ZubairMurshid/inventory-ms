import api from "./api.js"; // Use the custom api instance

const API_URL = "/products"; // Use relative path

export const getProducts = () => api.get(API_URL);

export const createProduct = (product) =>
  api.post(API_URL, product);

export const updateProduct = (id, product) =>
  api.put(`${API_URL}/${id}`, product);

export const deleteProduct = (id) =>
  api.delete(`${API_URL}/${id}`);