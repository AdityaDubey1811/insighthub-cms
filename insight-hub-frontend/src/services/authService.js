import api from "../api/axios";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
export const refreshToken = async (refreshToken) => {
  const response = await api.post("/auth/refresh", {
    refreshToken,
  });

  return response.data;
};
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};