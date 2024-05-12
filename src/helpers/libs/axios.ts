import axios from "axios";
import { useAuthStore } from "../../store/auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/cernim/public/api/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
