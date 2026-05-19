import api from "./api.js";

const API_URL = "/categories";

export const getCategories = () => api.get(API_URL);

export const createCategory = (category) =>
  api.post(API_URL, category);

export const updateCategory = (id, category) =>
  api.put(`${API_URL}/${id}`, category);

export const deleteCategory = (id) =>
  api.delete(`${API_URL}/${id}`);