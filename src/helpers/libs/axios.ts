import axios from "axios";
import { useAuthStore } from "../../store/auth";
import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/cernim/public/api/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Configuración de reintentos exponenciales
axiosRetry(api, {
  retries: 3,
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response?.status >= 500 ||
      error.response?.status === 429
    );
  },
});
export default api;
