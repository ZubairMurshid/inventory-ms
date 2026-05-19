import api from "./api.js";

const API_URL = "/suppliers";

export const getSuppliers = () => api.get(API_URL);

export const getSupplierById = (id) => api.get(`${API_URL}/${id}`);

export const createSupplier = (supplier) =>
  api.post(API_URL, supplier);

export const updateSupplier = (id, supplier) =>
  api.put(`${API_URL}/${id}`, supplier);

export const deleteSupplier = (id) =>
  api.delete(`${API_URL}/${id}`);