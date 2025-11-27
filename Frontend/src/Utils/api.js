import { BACKEND_URL } from "../config";

export const apiClient = async (url, options = {}) => {
  const token = localStorage.getItem('token');   //getting token from localstorage
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${BACKEND_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });
};