import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request Interceptor: Runs before every single request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // This attaches the token to the header automatically
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
