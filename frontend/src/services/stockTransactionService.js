import api from "./api.js";

const API_URL = "/transactions";

export const getTransactions = () => api.get(API_URL);

export const createTransaction = (transaction) =>
  api.post(API_URL, transaction);

export const updateTransaction = (id, transaction) =>
  api.put(`${API_URL}/${id}`, transaction);

export const deleteTransaction = (id) =>
  api.delete(`${API_URL}/${id}`);
