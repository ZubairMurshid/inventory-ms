import api from "./api";

// SIGNUP
export const signup = async (userData) => {

  const response = await api.post(
    "/auth/signup",
    userData
  );

  return response.data;
};

// LOGIN
export const login = async (userData) => {

  const response = await api.post(
    "/auth/login",
    userData
  );

  return response.data;
};